/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-20 22:05:51                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 19:49:06                                *
 * @FilePath              : auto-header-plus/test/runTest.js                   *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as path from 'path'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { runTests } from '@vscode/test-electron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../')

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index.js')

    // Download VS Code, unzip it and run the integration test
    runTests({ extensionDevelopmentPath, extensionTestsPath })
  } catch (err) {
    console.error('Failed to run tests', err)
    process.exit(1)
  }
}

main()
