/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 14:29:15                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 13:10:01                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/
  
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
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
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, "Auto Header Plus" is now active!`)
  logger.info(`"Auto Header Plus" is now active!`)

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
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
