import * as vscode from 'vscode';
import { readFileAsync } from './fsWrapper';
import { ISetting } from './settings';
import * as rjson from 'relaxed-json';
import { resolve } from 'path';

interface WrapData {
  txt: string;
  item: string;
  sel: vscode.Selection;
  doc: vscode.TextDocument;
  ran: vscode.Range;
  ind: string;
  idx: number;
  line: number;
  lastLine: boolean;
}

enum Wrap {
  Inline = 'Inline',
  Down = 'Down',
  Up = 'Up',
}

enum FormatAs {
  String = 'String',
}

let currentEditor: vscode.TextEditor;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  currentEditor = vscode.window.activeTextEditor!;
  context.globalState.setKeysForSync(['keyboardDancerVersion']);
  // 切换编辑器tab时，改变 currentEditor
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => (currentEditor = editor!)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.keyboardDancer.importFromKeyboardDancer', () => start()),
    vscode.commands.registerCommand('extension.keyboardDancer.console.log.variable', () => handleWrap(Wrap.Down)),
    vscode.commands.registerCommand('extension.keyboardDancer.console.log.string', () => handleWrap(Wrap.Down, FormatAs.String)),
  );
  const lastVersion = context.globalState.get('keyboardDancerVersion') || '';
  const currentVersion = context.extension.packageJSON.version
  if (lastVersion !== currentVersion) {
    await showPrompt();
    await context.globalState.update('keyboardDancerVersion', currentVersion);
  }
}

async function showPrompt(): Promise<void> {
  const answer: string | undefined = await vscode.window.showInformationMessage('Would you like to customize VS Code to behave more like Keyboard Dancer Text?', 'Yes', 'No');
  if (answer && answer === 'Yes') {
    start();
  }
}

async function start(): Promise<void> {
  const categorizedSettings = await getCategorizedSettings();
  if (categorizedSettings && categorizedSettings.length) {
    await importSettings(categorizedSettings);
  } else {
    vscode.window.showInformationMessage('Nothing to import. All settings have already been imported');
  }
}

async function getCategorizedSettings(): Promise<ISetting[] | null> {
  return await getSettings();
}

async function getSettings(): Promise<ISetting[] | null> {
  const [defaultsFile] = await Promise.all([
    readFileAsync(resolve(__dirname, '..', 'settings/defaults.json'), 'utf-8')
  ]);

  const settings: { [key: string]: any } = rjson.parse(defaultsFile)
  const settingArr: ISetting[] = []

  for (const key of Object.keys(settings)) {
    settingArr.push({
      name: key,
      value: settings[key]
    })

  }
  return settingArr
}

async function importSettings(settings: ISetting[]): Promise<void> {
  return vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: 'Importing Settings',
  }, async (progress) => {
    progress.report({ increment: 0 });
    const incrementSize = 100.0 / settings.length;
    const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
    for (const setting of settings) {
      try {
        await config.update(setting.name, setting.value, vscode.ConfigurationTarget.Global);
        progress.report({ increment: incrementSize, message: setting.name });
      } catch (e: any) {
        vscode.window.showErrorMessage(e.message);
        return;
      }
    }
  });
}

function getSetting(setting: string) {
  var spl = setting.split(".");

  return spl.length == 1
    ? vscode.workspace.getConfiguration("keyboard-dancer")[setting]
    : spl.splice(1).reduce((a, b) => {
      return a[b];
    }, vscode.workspace.getConfiguration("keyboard-dancer")[spl[0]]);
}

async function handleWrap(
  target: Wrap,
  formatAs?: FormatAs
) {
  new Promise<WrapData>((resolve, reject) => {
    let sel = currentEditor.selection;
    let len = sel.end.character - sel.start.character;

    let ran =
      len == 0
        ? currentEditor.document.getWordRangeAtPosition(sel.anchor)
        : new vscode.Range(sel.start, sel.end);

    if (ran == undefined) {
      reject("NO_WORD")
      return
    }
    let doc = currentEditor.document;
    let lineNumber = ran.start.line;
    let idx = doc.lineAt(lineNumber).firstNonWhitespaceCharacterIndex;
    let wrapData: WrapData = {
      txt: '',
      item: doc.getText(ran),
      doc: doc,
      ran: ran,
      idx: idx,
      ind: doc.lineAt(lineNumber).text.substring(0, idx),
      line: lineNumber,
      sel: sel,
      lastLine: doc.lineCount - 1 == lineNumber,
    };

    if (formatAs != undefined) {
      switch (formatAs) {
        case FormatAs.String:
          wrapData.txt = getSetting("console.log.functionName").concat(
            "('",
            wrapData.item,
            "')"
          );
          break;
      }
    } else {
      wrapData.txt = getSetting("console.log.format")
        .replace("$functoin", getSetting("console.log.functionName"))
        .replace(/[$]var/g, wrapData.item);
    }
    resolve(wrapData);
  })
    .then((wrap: WrapData) => {
      function SetCursor(line: number) {
        let tpos = new vscode.Position(
          line,
          currentEditor.selection.anchor.character
        )
        if (tpos) {
          currentEditor.selection = new vscode.Selection(tpos, tpos);
        }
      }

      switch (target) {
        case Wrap.Down: {
          let nxtLine: vscode.TextLine;
          let nxtLineInd: string;

          if (!wrap.lastLine) {
            nxtLine = wrap.doc.lineAt(wrap.line + 1);
            nxtLineInd = nxtLine.text.substring(
              0,
              nxtLine.firstNonWhitespaceCharacterIndex
            );
          } else {
            nxtLineInd = "";
          }

          wrap.ind = "";
          new vscode.Position(
            wrap.line,
            wrap.doc.lineAt(wrap.line).range.end.character
          );

          currentEditor
            .edit((e) => {

              if (wrap.lastLine == false && nxtLine.isEmptyOrWhitespace) {
                function defaultAction() {
                  e.insert(
                    new vscode.Position(
                      wrap.line,
                      wrap.doc.lineAt(wrap.line).range.end.character
                    ),
                    "\n".concat(
                      nxtLineInd > wrap.ind ? nxtLineInd : wrap.ind,
                      wrap.txt
                    )
                  );
                }
                defaultAction();
              } else {
                e.insert(
                  new vscode.Position(
                    wrap.line,
                    wrap.doc.lineAt(wrap.line).range.end.character
                  ),
                  "\n".concat(
                    nxtLineInd.length > wrap.ind.length ? nxtLineInd : wrap.ind,
                    wrap.txt
                  )
                );
              }
            })
            .then(() => {
              if (nxtLine == undefined) {
                nxtLine = wrap.doc.lineAt(wrap.line + 1);
              }
              if (!wrap.lastLine) {
                let nextLineEnd = wrap.doc.lineAt(wrap.line + 2).range.end;
                currentEditor.selection = new vscode.Selection(
                  wrap.sel.start,
                  nextLineEnd
                );
              } else {
                currentEditor.selection = wrap.sel;
              }
              SetCursor(wrap.line);
            });
        }
          break;
        default:
          break;
      }
    })
    .catch((message) => {
      console.log("vscode-keyboard-dancer console log CANCEL: " + message);
    });
}
