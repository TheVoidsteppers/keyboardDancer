import * as vscode from 'vscode';
import { readFileAsync } from './fsWrapper';
import { ISetting } from './settings';
import * as rjson from 'relaxed-json';
import { resolve } from 'path';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  context.globalState.setKeysForSync(['keyboardDancerVersion']);
  context.subscriptions.push(vscode.commands.registerCommand('extension.importFromKeyboardDancer', () => start()));
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
