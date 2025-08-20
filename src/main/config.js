/*****************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                    *
 * @CreatedDate           : 2025-08-20 18:32:13                              *
 * @LastEditors           : Robert Huang<56649783@qq.com>                    *
 * @LastEditDate          : 2025-08-21 01:54:27                              *
 * @CopyRight             : MerBleueAviation                                 *
 ****************************************************************************/
const vscode = require('vscode')
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync(__dirname + '../../../package.json', { encoding: 'utf-8' }))
const config = vscode.workspace.getConfiguration(packageJson.name)

module.exports = config
