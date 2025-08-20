/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 20:15:08                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 12:51:24                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode')
const assert = require('assert')
const config = require('../../main/config')

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')
  console.log('Extension config:', config)

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5))
    assert.strictEqual(-1, [1, 2, 3].indexOf(0))
  })
})
