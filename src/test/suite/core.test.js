/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-18 20:15:08                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-19 16:37:38                               *
 * @FilePath              : auto-header-plus/src/test/suite/core.test.js      *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/














// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require('vscode');
const assert = require('assert');
const { getHeaderRange, buildLine, getElementValue, genNewHeader } = require('../../main/core.js');
const { suite, test } = require('mocha');

const config = require('../../main/config.js')

// Mock style object for testing
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

  test('getHeaderRange with shebang test', async () => {
    // Mock shell script style (similar to style.4 in package.json)
    const shellStyle = {
      firstLineStart: "####",
      firstLineMiddle: "",
      firstLineEnd: "",
      middleLineStart: "# ",
      commentElementPrefix: "@",
      commentElementSuffix: ": ",
      middleLineEnd: "",
      lastLineStart: "",
      lastLineMiddle: "",
      lastLineEnd: "####"
    };

    // Test document with shebang and header comment
    const docWithShebang = await vscode.workspace.openTextDocument({
      language: 'shellscript',
      content: '#!/bin/bash\r\n###############################################################################\r\n# @Author                : YourName<your-email@example.com>                   #\r\n# @CreatedDate           : 2025-01-19 15:30:00                               #\r\n# @LastEditors           : YourName<your-email@example.com>                   #\r\n# @LastEditDate          : 2025-01-19 15:30:00                               #\r\n# @FilePath              : /path/to/your/script.sh                           #\r\n# @CopyRight             : YourCompany                                       #\r\n###############################################################################\r\necho "Hello World"'
    });

    const rangeWithShebang = getHeaderRange(docWithShebang, shellStyle);
    console.log('Range with shebang:', rangeWithShebang);
    
    // Should find header starting from line 1 (after shebang), not line 0
    assert.strictEqual(rangeWithShebang.start.line, 1);
    assert.strictEqual(rangeWithShebang.start.character, 0);
    // The actual range only covers the first line of the header, not the whole header block

    // Test document without shebang for comparison
    const docWithoutShebang = await vscode.workspace.openTextDocument({
      language: 'shellscript',
      content: '###############################################################################\r\n# @Author                : YourName<your-email@example.com>                   #\r\n# @CreatedDate           : 2025-01-19 15:30:00                               #\r\n# @LastEditors           : YourName<your-email@example.com>                   #\r\n# @LastEditDate          : 2025-01-19 15:30:00                               #\r\n# @FilePath              : /path/to/your/script.sh                           #\r\n# @CopyRight             : YourCompany                                       #\r\n###############################################################################\r\necho "Hello World"'
    });

    const rangeWithoutShebang = getHeaderRange(docWithoutShebang, shellStyle);
    console.log('Range without shebang:', rangeWithoutShebang);
    
    // Should find header starting from line 0 (first line)
    assert.strictEqual(rangeWithoutShebang.start.line, 0);
    assert.strictEqual(rangeWithoutShebang.start.character, 0);

    // Verify that the function correctly skips the shebang line when present
    assert.notStrictEqual(rangeWithShebang.start.line, rangeWithoutShebang.start.line);
    assert.strictEqual(rangeWithShebang.start.line, rangeWithoutShebang.start.line + 1);

    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  })
})