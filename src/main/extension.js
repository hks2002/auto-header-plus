/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-21 02:04:00                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 19:07:15                                *
 * @FilePath              : auto-header-plus/src/main/extension.js             *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const vscode = require('vscode')
const logger = require('./logger')
const saveHandler = require('./saveHandler')
const newHandler = require('./newHandler')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  logger.info(`Auto Header Plus is now active!`)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(`auto-header-plus.addHeader`, saveHandler)
  context.subscriptions.push(disposable)

  // handle events
  vscode.workspace.onDidCreateFiles(newHandler)
  vscode.workspace.onWillSaveTextDocument(saveHandler)
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
