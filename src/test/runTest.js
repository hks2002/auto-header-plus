/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-20 22:05:51                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 19:06:36                                *
 * @FilePath              : auto-header-plus/src/test/runTest.js               *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const path = require('path')

const { runTests } = require('@vscode/test-electron')
 function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../')

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index')

    // Download VS Code, unzip it and run the integration test
    runTests({ extensionDevelopmentPath, extensionTestsPath })
  } catch (err) {
    console.error('Failed to run tests', err)
    process.exit(1)
  }
}

main()
