/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-07 15:29:47                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-07 15:29:47                               *
 * @FilePath              : auto-header-plus/src/test/suite/utils.test.ts     *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/
const vscode = require('vscode')
const assert = require('assert')
const config = require('../../main/config')
const dayjs = require('dayjs')
const { executeCommand, getApplyStyle, getDateValue, getFinalString, getPathValue } = require('../../main/utils')

const styleC = config.style['0']
const stylePy = config.style['2']

suite('Utils Test Suite', () => {
  test('executeCommand test', () => {
    assert.strictEqual(executeCommand('echo TEST'), 'TEST')
    assert.strictEqual(getFinalString('${echo TEST}'), 'TEST')
  })

  test('getApplyStyle test', () => {
    assert.strictEqual(getApplyStyle([{}], 'js'), undefined)
    assert.deepStrictEqual(getApplyStyle(config['style'], '.js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'j'), undefined)
    assert.deepStrictEqual(getApplyStyle(config['style'], 'py'), stylePy)
  })

  test('getDateValue test', () => {
    assert.strictEqual(getDateValue('UNK', 'YYYY-MM-DD HH:mm:ss', null), '')
    assert.strictEqual(
      getDateValue('MODIFIED_DATE', 'YYYY-MM-DD HH:mm:ss', null),
      dayjs().format('YYYY-MM-DD HH:mm:ss')
    )
    assert.strictEqual(getDateValue('CREATED_DATE', 'YYYY-MM-DD HH:mm:ss', null), dayjs().format('YYYY-MM-DD HH:mm:ss'))
    assert.strictEqual(
      getDateValue('CREATED_DATE', 'YYYY-MM-DD HH:mm:ss', '2023-02-01 12:01:12'),
      dayjs('2023-02-01 12:01:12').format('YYYY-MM-DD HH:mm:ss')
    )
  })

  test('getPathValue test', () => {
    assert.strictEqual(getPathValue('UNK', vscode.Uri.file('C:/Untitled.js')), '')
    assert.strictEqual(getPathValue('FULL_PATH', vscode.Uri.file('C:/Untitled.js')), 'c:/Untitled.js')
    assert.strictEqual(getPathValue('RELATIVE_PATH', vscode.Uri.file('C:/Untitled.js')), 'c:/Untitled.js')
    assert.strictEqual(getPathValue('SHORTNAME_PATH', vscode.Uri.file('C:/Untitled.js')), 'Untitled.js')
  })
})
