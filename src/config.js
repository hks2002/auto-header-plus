/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-20 18:32:13                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 18:51:29                                *
 * @FilePath              : auto-header-plus/src/config.js                     *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as vscode from 'vscode'
import packageJson from '../package.json' with { type: 'json' }

const config = vscode.workspace.getConfiguration(`${packageJson.name}`)

export { config }
