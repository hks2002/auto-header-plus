/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 14:56:08                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-21 02:05:17                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/
const path = require('path')
const Mocha = require('mocha')
const glob = require('glob')

function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  })

  const testsRoot = path.resolve(__dirname, '..')
  const files = glob.sync('**/**.test.js', { cwd: testsRoot })

  return new Promise((c, e) => {
    // Add files to the test suite
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)))

    try {
      // Run the mocha test
      mocha.run((failures) => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`))
        } else {
          c()
        }
      })
    } catch (err) {
      console.error(err)
      e(err)
    }
  })
}

module.exports = {
  run
}
