/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-01-06 18:04:18                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-06 20:17:39                               *
 * @FilePath              : auto-header-plus/src/test/suite/header.test.ts    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert'
import * as vscode from 'vscode'
import { buildLine, genNewHeader, getElementValue, getHeaderRange } from '../../header'
import { styleC } from '../config'

suite('Header Test Suite', () => {
  test('getHeaderRange 1 test', async () => {
    const doc = await vscode.workspace.openTextDocument({ language: 'javascript', content: '' })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 0)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 2 test', async () => {
    const doc = await vscode.workspace.openTextDocument({ language: 'javascript', content: '/** balabala*/\r' })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 1)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 3 test', async () => {
    const doc = await vscode.workspace.openTextDocument({ language: 'javascript', content: '/** balabala */\r' })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 1)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 4 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r*/\r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 3)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 5 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r */\r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 3)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 6 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r */\r balabala \r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 0)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 7 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r */\r \r balabala \r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 3)
    assert.strictEqual(range.end.character, 0)
  })

  test('buildLine test', async () => {
    assert.strictEqual(buildLine('/*', '', '*/', 10), '/**/')
    assert.strictEqual(buildLine('/*', '', '', 10), '/*')
    assert.strictEqual(buildLine('/*', ' ', '', 10), '/*        ')
    assert.strictEqual(buildLine('/*', ' ', '*/', 10), '/*      */')
    assert.strictEqual(buildLine('', '', '*/', 10), '*/')
    assert.strictEqual(buildLine('', ' ', '*/', 10), '        */')
    assert.strictEqual(buildLine('/****', ' ', '****/', 0), '/**** ****/')
    assert.strictEqual(buildLine('/****', ' ', '****/', 5), '/********/')
  })

  test('getElementValue 1 test', async () => {
    // @Author    : Auto Header Plus
    const element = buildLine('@Author', ' ', ': ', styleC.commentElementWidth)
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: `/**\r * ${element} Auto Header Plus \r */\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, styleC, 'Author')
    assert.strictEqual(val, 'Auto Header Plus')
  })
  test('getElementValue 2 test', async () => {
    // @Author: Auto Header Plus
    const element = buildLine('@Author', '', ':', styleC.commentElementWidth)
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: `/**\r * ${element} Auto Header Plus \r */\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, styleC, 'Author')
    assert.strictEqual(val, 'Auto Header Plus')
  })
  test('getElementValue 3 test', async () => {
    // @Author Auto Header Plus
    const element = buildLine('@Author', '', '', styleC.commentElementWidth)
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: `/**\r * ${element} Auto Header Plus \r */\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, styleC, 'Author')
    assert.strictEqual(val, 'Auto Header Plus')
  })

  test('genHeader test', async () => {
    const doc = await vscode.workspace.openTextDocument({ language: 'javascript', content: '' })
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')
    const header = genNewHeader(
      doc,
      styleC,
      'YYYY-MM-DD HH:mm:ss',
      ['Author', 'DateCreated', 'DateModified', 'FullPath', 'RelativePath', 'ShortPath'],
      {
        'Author': 'Auto Header Plus',
        'DateCreated': 'CREATEDDATE',
        'DateModified': 'MODIFIEDDATE',
        'FullPath': 'FULLPATH',
        'RelativePath': 'RELATIVEPATH',
        'ShortPath': 'SHORTNAMEPATH'
      },
      {},
      {}
    )

    console.log(header)
  })
})
