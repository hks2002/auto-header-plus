/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 10:01:21                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-07 15:23:41                               *
 * @FilePath              : auto-header-plus/src/extension.ts                 *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import packageJson from '../package.json'
import { handleNew, handleSave } from './handle'
import { addHeader } from './header'
import { Logger } from './logger'
import { config } from './utils'

const logger = new Logger()
logger.setOutputLevel(config().get('logLevel', 'INFO'))

export { logger }

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, "${packageJson.displayName}" is now active!`)
  logger.info(`"${packageJson.displayName}" is now active!`)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(`${packageJson.name}.addHeader`, addHeader)

  context.subscriptions.push(disposable)

  // handle events
  vscode.workspace.onWillSaveTextDocument(handleSave)
  vscode.workspace.onDidCreateFiles(handleNew)
}

// This method is called when your extension is deactivated
export function deactivate() {}
