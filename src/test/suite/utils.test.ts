import * as assert from 'assert'
import dayjs from 'dayjs'
import * as vscode from 'vscode'
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { config } from '../../extension'
import { executeCommand, getApplyStyle, getDateValue, getFinalStringContainsCmd, getPathValue } from '../../utils'
import { styleC, stylePy } from '../config'

suite('Utils Test Suite', () => {
  test('executeCommand test', () => {
    assert.strictEqual(executeCommand('echo TEST'), 'TEST')
    assert.strictEqual(getFinalStringContainsCmd('${echo TEST}'), 'TEST')
  })

  test('getApplyStyle test', () => {
    assert.strictEqual(getApplyStyle({}, 'js'), undefined)
    assert.deepStrictEqual(getApplyStyle(config.get('style', {}), '.js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config.get('style', {}), 'js'), styleC)
    assert.deepStrictEqual(getApplyStyle(config.get('style', {}), 'j'), undefined)
    assert.deepStrictEqual(getApplyStyle(config.get('style', {}), 'py'), stylePy)
  })

  test('getDateValue test', () => {
    assert.strictEqual(getDateValue('UNK', 'YYYY-MM-DD HH:mm:ss'), '')
    assert.strictEqual(getDateValue('MODIFIEDDATE', 'YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss'))
    assert.strictEqual(getDateValue('CREATEDDATE', 'YYYY-MM-DD HH:mm:ss'), dayjs().format('YYYY-MM-DD HH:mm:ss'))
    assert.strictEqual(
      getDateValue('CREATEDDATE', 'YYYY-MM-DD HH:mm:ss', '2023-02-01 12:01:12'),
      dayjs('2023-02-01 12:01:12').format('YYYY-MM-DD HH:mm:ss')
    )
  })

  test('getPathValue test', () => {
    assert.strictEqual(getPathValue('UNK', vscode.Uri.file('C:/Untitled.js')), '')
    assert.strictEqual(getPathValue('FULLPATH', vscode.Uri.file('C:/Untitled.js')), 'c:/Untitled.js')
    assert.strictEqual(getPathValue('RELATIVEPATH', vscode.Uri.file('C:/Untitled.js')), 'c:/Untitled.js')
    assert.strictEqual(getPathValue('SHORTNAMEPATH', vscode.Uri.file('C:/Untitled.js')), 'Untitled.js')
  })
})
