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
const { getHeaderRange, buildLine, getElementValue, genNewHeader } = require('../../main/core')

const styleC = config.style['0']

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
    assert.strictEqual(range.end.line, 0)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 3 test', async () => {
    const doc = await vscode.workspace.openTextDocument({ language: 'javascript', content: '/** balabala */\r' })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 0)
    assert.strictEqual(range.end.character, 0)
  })

  test('getHeaderRange 4 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r**/\r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 2)
    assert.strictEqual(range.end.character, 3)
  })

  test('getHeaderRange 5 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r **/\r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 2)
    assert.strictEqual(range.end.character, 4)
  })

  test('getHeaderRange 6 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r **/\r balabala \r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 2)
    assert.strictEqual(range.end.character, 4)
  })

  test('getHeaderRange 7 test', async () => {
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: '/** balabala \r balabala \r **/\r \r balabala \r'
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    assert.strictEqual(range.start.line, 0)
    assert.strictEqual(range.start.character, 0)
    assert.strictEqual(range.end.line, 2)
    assert.strictEqual(range.end.character, 4)
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
      content: `/**\r * ${element} Auto Header Plus \r **/\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, 'Author')
    assert.strictEqual(val, 'Auto Header Plus')
  })

  test('getElementValue 2 test', async () => {
    // @Author: Auto Header Plus
    const element = buildLine('@Author', '', ':', styleC.commentElementWidth)
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: `/**\r * ${element} Auto Header Plus \r **/\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, 'Author')
    assert.strictEqual(val, 'Auto Header Plus')
  })
  test('getElementValue 3 test', async () => {
    // @Author Auto Header Plus
    const element = buildLine('@Author', '', '', styleC.commentElementWidth)
    const doc = await vscode.workspace.openTextDocument({
      language: 'javascript',
      content: `/**\r * ${element} Auto Header Plus \r **/\r \r`
    })
    const range = getHeaderRange(doc, styleC)
    console.log(doc.getText(), range)
    vscode.commands.executeCommand('workbench.action.closeActiveEditor')

    const val = getElementValue(doc, range, 'Author')
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
        'DateCreated': 'CREATED_DATE',
        'DateModified': 'MODIFIED_DATE',
        'FullPath': 'FULL_PATH',
        'RelativePath': 'RELATIVE_PATH',
        'ShortPath': 'SHORTNAME_PATH'
      },
      {},
      {}
    )

    console.log(header)
  })
})
