/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2023-02-07 15:29:47                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 19:52:58                                *
 * @FilePath              : auto-header-plus/test/suite/utils.test.js          *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as vscode from 'vscode'
import * as assert from 'assert'
import { suite, test, before } from 'mocha'
import {
  formatDate,
  executeCommand,
  getApplyStyle,
  getDateValue,
  getFinalString,
  getPathValue,
} from '../../src/utils.js'
import { config } from '../../src/config.js'
import packageJson from '../../package.json' with { type: 'json' }

let styleC
let stylePy

suite('🧪Utils Test Suite', async () => {
  before(async () => {
    const ext = vscode.extensions.getExtension(`${packageJson.publisher}.${packageJson.name}`)
    if (ext) {
      await ext.activate()
    }
    styleC = config.style['0']
    stylePy = config.style['2']
  })

  test('getApplyStyle test', () => {
    assert.strictEqual(getApplyStyle([{}], 'js'), undefined)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'j'), undefined)
    assert.deepStrictEqual(getApplyStyle(config['style'], '.js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'py'), stylePy)
  })

  test('getDateValue test', () => {
    assert.strictEqual(getDateValue('UNK', 'YYYY-MM-DD HH:mm:ss', null), '')
    assert.strictEqual(
      getDateValue('MODIFIED_DATE', 'YYYY-MM-DD HH:mm:ss', null),
      formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    )
    assert.strictEqual(
      getDateValue('CREATED_DATE', 'YYYY-MM-DD HH:mm:ss', null),
      formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    )
    assert.strictEqual(
      getDateValue('CREATED_DATE', 'YYYY-MM-DD HH:mm:ss', '2023-02-01 12:01:12'),
      formatDate(new Date('2023-02-01 12:01:12'), 'YYYY-MM-DD HH:mm:ss'),
    )
  })

  test('getPathValue test', () => {
    assert.strictEqual(getPathValue('UNK', vscode.Uri.file('C:/Untitled.js')), '')
    assert.strictEqual(
      getPathValue('FULL_PATH', vscode.Uri.file('C:/Untitled.js')),
      'c:/Untitled.js',
    )
    assert.strictEqual(
      getPathValue('RELATIVE_PATH', vscode.Uri.file('C:/Untitled.js')),
      'c:/Untitled.js',
    )
    assert.strictEqual(
      getPathValue('SHORTNAME_PATH', vscode.Uri.file('C:/Untitled.js')),
      'Untitled.js',
    )
  })

  test('executeCommand test', async () => {
    assert.strictEqual(await executeCommand('echo TEST'), 'TEST')
    assert.strictEqual(await getFinalString('${echo TEST}'), 'TEST')
  })
})
