/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 20:41:53                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-04 20:41:53                               *
 * @FilePath              : auto-header-plus/src/test/suite/extension.test.ts *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import * as assert from 'assert'
import * as vscode from 'vscode'
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5))
    assert.strictEqual(-1, [1, 2, 3].indexOf(0))
  })
})
