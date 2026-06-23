/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-21 02:04:00                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 19:51:02                                *
 * @FilePath              : auto-header-plus/src/extension.js                  *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as vscode from 'vscode'
import packageJson from '../package.json' with { type: 'json' }
import { addHeader } from './core.js'
import { newHandler } from './newHandler.js'
import { saveHandler } from './saveHandler.js'
import { logger } from './logger.js'

export function activate(context) {
  logger.info(`${packageJson.displayName} is now active!`)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(`${packageJson.name}.addHeader`, addHeader)
  context.subscriptions.push(disposable)

  // handle events
  vscode.workspace.onDidCreateFiles(newHandler)
  vscode.workspace.onWillSaveTextDocument(saveHandler)
}

// This method is called when your extension is deactivated
export function deactivate() {}
