import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  context.subscriptions.push(vscode.commands.registerCommand('extension.keyboardDancer.importFromKeyboardDancer', () => {
    vscode.window.showWarningMessage('Importing from local Keyboard Dancer settings is currently only possible when running in the desktop.', { modal: true })
  }));
}