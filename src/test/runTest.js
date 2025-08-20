/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-20 17:08:26                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 17:08:27                               *
 * @FilePath              : test/src/test/runTest.js                          *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 15:18:32                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 12:51:18                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/
const path = require('path')

const { runTests } = require('@vscode/test-electron')
async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../')

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index')

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath })
  } catch (err) {
    console.error('Failed to run tests')
    process.exit(1)
  }
}

main()
