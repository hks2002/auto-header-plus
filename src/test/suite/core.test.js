/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-18 20:15:08                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-21 09:43:02                                *
 * @FilePath              : auto-header-plus/src/test/suite/core.test.js       *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const vscode = require('vscode');
const assert = require('assert');
const { getHeaderRange, buildLine, getElementValue, genNewHeader } = require('../../main/core.js');
const { suite, test, before } = require('mocha');

let styleC;

suite('🧪Header Test Suite', () => {
  before(async () => {
    const ext = vscode.extensions.getExtension('MerBleueAviation.auto-header-plus');
    if (ext) {
      await ext.activate();
    }
    const config = vscode.workspace.getConfiguration('auto-header-plus');
    styleC = config.style['0'];
  });

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

  test('getHeaderRange with shebang test 1', async () => {
    // Mock shell script style (similar to style.4 in package.json)
    const shellStyle = {
      applyTo: "sh",
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
    const text1 = `#!/bin/bash

echo "Hello World"`

    const doc1 = await vscode.workspace.openTextDocument({
      language: 'shellscript',
      content: text1
    });

    const range1 = getHeaderRange(doc1, shellStyle);
    console.log('Range with shebang:', text1, range1);

    assert.strictEqual(range1.start.line, 1);
    assert.strictEqual(range1.start.character, 0);
    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  })

  test('getHeaderRange with shebang test 2', async () => {
    // Mock shell script style (similar to style.4 in package.json)
    const shellStyle = {
      applyTo: "sh",
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
    const text2 = `#!/bin/bash
#######################
# @Author             #
# @CreatedDate        #
# @LastEditors        #
# @LastEditDate       #
# @FilePath           #
# @CopyRight          #
#######################
echo "Hello World"`

    const doc2 = await vscode.workspace.openTextDocument({
      language: 'shellscript',
      content: text2
    });

    const range2 = getHeaderRange(doc2, shellStyle);
    console.log('Range with shebang:', text2, range2);

    assert.strictEqual(range2.start.line, 1);
    assert.strictEqual(range2.start.character, 0);

    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  })

  test('getHeaderRange with shebang test 3', async () => {
    // Mock shell script style (similar to style.4 in package.json)
    const shellStyle = {
      applyTo: "sh",
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

    // Test document without shebang for comparison
    const text3 = `#######################
# @Author             #
# @CreatedDate        #
# @LastEditors        #
# @LastEditDate       #
# @FilePath           #
# @CopyRight          #
#######################
echo "Hello World"`

    const doc3 = await vscode.workspace.openTextDocument({
      language: 'shellscript',
      content: text3
    });

    const range3 = getHeaderRange(doc3, shellStyle);
    console.log('Range without shebang:', text3, range3);

    assert.strictEqual(range3.start.line, 0);
    assert.strictEqual(range3.start.character, 0);

    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  })
})