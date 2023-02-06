/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 00:03:21                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-06 20:11:05                               *
 * @FilePath              : auto-header-plus/src/header.ts                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import path from 'path'
import * as vscode from 'vscode'
import { config, logger } from './extension'
import { getApplyStyle, getDateValue, getFinalStringContainsCmd, getPathValue, splitString } from './utils'

const t = vscode.l10n.t
const SPECVALUE = ['MODIFIEDDATE', 'CREATEDDATE', 'FULLPATH', 'RELATIVEPATH', 'SHORTNAMEPATH']

/**
 * Find header range in document by style setting,
 * comment start logic seq: `start`>`middle`>`end`,
 * comment end logic seq: `end`>`middle`>`start`,
 *
 * It assumes that the header comment block's first character at the first col 0,
 * and the header comment block's last character is end with a new empty line,
 * if not found, `Range(0,0,0,0)` will be returned
 * @param doc document
 * @param style style setting
 * @returns
 */
const getHeaderRange = (doc: vscode.TextDocument, style: ahp.StyleRaw): vscode.Range => {
  let startLine = 0
  let startChar = 0
  let endLine = 0
  let endChar = 0

  const firstLineSymbol = style.firstLineStart || style.firstLineMiddle || style.firstLineEnd || '/*'
  const lastLineSymbol = style.lastLineEnd || style.lastLineMiddle || style.lastLineStart || '*/'
  // find firstline start
  for (let i = 0; i < doc.lineCount; i++) {
    const lineProp = doc.lineAt(i)
    if (lineProp.isEmptyOrWhitespace) {
      continue
    }
    if (lineProp.text.startsWith(firstLineSymbol)) {
      startLine = i
      startChar = lineProp.text.indexOf(firstLineSymbol)
      break // once found, break for loop
    }
  }
  // find lastline, from the firstline start line
  for (let i = startLine; i < doc.lineCount; i++) {
    const lineProp = doc.lineAt(i)
    if (lineProp.isEmptyOrWhitespace) {
      continue
    }
    // i can't be the last line, and the following line must be empty or whitespace
    if (lineProp.text.endsWith(lastLineSymbol) && i < doc.lineCount - 1) {
      const nextLineProp = doc.lineAt(i + 1)
      if (nextLineProp.isEmptyOrWhitespace) {
        // ❤️ we found the header range
        endLine = i + 1
        endChar = 0
      } else {
        // if the following line is not empty or whitespace,
        // we treat it not as a header
        startLine = 0
        startChar = 0
        endLine = 0
        endChar = 0
      }
      break
    }
  }

  return new vscode.Range(startLine, startChar, endLine, endChar)
}

// get number text between number and number
// const getNumTxt = (str: string) => {
//   const found = str.match(/([^\d]*)(\d.*\d)/i)
//   return found && found.length > 0 ? found[2] : ''
// }

// get text of element value parts
const getTxt = (scr: string, target: string) => {
  const idx = scr.indexOf(target)
  const len = target.length

  if (idx > -1) {
    const toBeFound = scr.slice(idx + len)
    // style1: : 2021-02-04 00:03:21
    // style2:  : 2021-02-04 00:03:21
    // style3:  2021-02-04 00:03:21
    const found = toBeFound.match(/(\W*\s+)(.*)(\s*\W)/i)
    return found && found.length > 0 ? found[2] : ''
  } else {
    return ''
  }
}

/**
 * Get header comment value by header range
 * @param range Header range
 * @param doc document
 * @param targetElement Comment Element
 * @returns
 */
const getElementValue = (
  doc: vscode.TextDocument,
  range: vscode.Range,
  style: ahp.StyleRaw,
  targetElement: string
): string => {
  let elementContent = ''
  for (let i = range.start.line; i <= range.end.line; i++) {
    const lineProp = doc.lineAt(i)
    if (lineProp.isEmptyOrWhitespace) {
      continue
    }
    // build by self current style
    if (lineProp.text.includes(targetElement)) {
      elementContent = getTxt(lineProp.text, targetElement)
      break
    }

    // build by other tools, we guress the name of element
    const lowerCaseText = lineProp.text.toLowerCase()
    if (targetElement.toUpperCase().includes('CREATE')) {
      // resume it contains create/created date/datetime
      elementContent = getTxt(lowerCaseText, 'createdatetime')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'createdate')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'createddatetime')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'createddate')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'datetime')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'date')
      if (elementContent.length > 0) {
        break
      }
    }

    if (targetElement.toUpperCase().includes('AUTHOR')) {
      elementContent = getTxt(lowerCaseText, 'author')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'creator')
      if (elementContent.length > 0) {
        break
      }
      elementContent = getTxt(lowerCaseText, 'createdby')
      if (elementContent.length > 0) {
        break
      }
    }

    if (targetElement.toUpperCase().includes('DESC')) {
      elementContent = getTxt(lowerCaseText, 'desc')
      if (elementContent.length > 0) {
        break
      }

      elementContent = getTxt(lowerCaseText, 'description')
      if (elementContent.length > 0) {
        break
      }
    }
  }

  return elementContent
}

/**
 * Build line text by `start`, `middle`, `end` and `width`,
 * If line width is 0, `start`+`middle`+`end` will be returned,
 * otherwise, it try to repeat fill `middle` as possible,
 * if line width is not enough, it will return `start`+`end`
 * @param s
 * @param m
 * @param e
 * @param width
 * @returns
 */
const buildLine = (s: string, m: string, e: string, width: number): string => {
  let lineText = ''
  lineText += s
  if (width === 0) {
    lineText += m + e
  } else {
    const len = width - s.length - e.length
    if (len < 0) {
      logger.warn(t('Width is too short'))
      lineText += e
    } else {
      const middle = m.repeat(len)
      lineText += middle + e
    }
  }
  return lineText
}

/**
 * Generate header comment block
 * @param doc
 * @param style
 * @param dateFormat
 * @param commentElements
 * @param commentElementsValues
 * @param customCommentElementsValues
 * @param oldCommentElementsValues
 * @param range
 * @returns
 */
const genNewHeader = (
  doc: vscode.TextDocument,
  style: ahp.StyleRaw,
  dateFormat: string,
  commentElements: string[],
  commentElementsValues: ahp.CommentElementsValues,
  customCommentElementsValues: ahp.CustomCommentElementsValues,
  oldCommentElementsValues: ahp.CommentElementsValues
): string => {
  let headerText = ''
  const allCreateDateDiff = config.get('allCreateDateDiff', true)
  const eolText = doc.eol === vscode.EndOfLine.LF ? '\r' : '\r\n'

  // firstLine
  headerText += buildLine(style.firstLineStart, style.firstLineMiddle, style.firstLineEnd + eolText, style.lineWidth)

  // middleLine
  for (let i = 0; i < commentElements.length; i++) {
    const element = commentElements[i]
    // custom value has higher priority
    const elementValue = customCommentElementsValues[element] || commentElementsValues[element]
    logger.debug(`element: ${element}, elementValue: ${elementValue}`)

    // build element text, fill with space
    let elementText = buildLine(
      style.commentElementPrefix + element,
      ' ',
      style.commentElementSuffix,
      style.commentElementWidth
    )
    let elementValueText = ''

    if (elementValue) {
      elementValueText = getFinalStringContainsCmd(elementValue) || ''
      const ELEMENTVALUETEXT = elementValueText.toUpperCase()

      SPECVALUE.includes(ELEMENTVALUETEXT) && ELEMENTVALUETEXT.endsWith('PATH')
        ? (elementValueText = getPathValue(ELEMENTVALUETEXT, doc.uri))
        : null

      SPECVALUE.includes(ELEMENTVALUETEXT) && ELEMENTVALUETEXT.endsWith('DATE')
        ? (elementValueText = getDateValue(
            ELEMENTVALUETEXT,
            dateFormat,
            allCreateDateDiff ? oldCommentElementsValues[element] : undefined
          ))
        : null
    } else {
      logger.info(t("Element {0} value didn't set in config", element))
      elementText = ''
      elementValueText = ''
    }

    // build whole middle line, fill with space
    headerText += buildLine(
      style.middleLineStart + elementText + elementValueText,
      ' ',
      style.middleLineEnd + eolText,
      style.lineWidth
    )
  }

  // additional comment
  const additionalComment = config.get('additionalComment', '')
  if (additionalComment.length > 0) {
    const additionalCommentText = getFinalStringContainsCmd(additionalComment) || ''
    splitString(additionalCommentText, style.lineWidth).forEach((line) => {
      headerText += buildLine(style.middleLineStart + line, ' ', style.middleLineEnd + eolText, style.lineWidth)
    })
  }

  // lastLine
  headerText += buildLine(style.lastLineStart, style.lastLineMiddle, style.lastLineEnd + eolText, style.lineWidth)

  return headerText
}

const addHeader = () => {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    editor.edit((editBuilder: vscode.TextEditorEdit) => {
      try {
        logger.info(t('Adding header to {0}', editor.document.fileName))
        const ext = path.extname(editor.document.fileName)
        const style = getApplyStyle(config.get('style', {}), ext)
        if (!style) {
          return
        }

        const headerRange = getHeaderRange(editor.document, style)

        const commentElements = config.get('commentElements', [])
        const commentElementsValue = config.get('commentElementsValue', {})
        const customCommentElementsValue = config.get('customCommentElementsValue', {})
        const oldCommentElementsValue = {} as ahp.CommentElementsValues
        for (const element of commentElements) {
          const elementValue = getElementValue(editor.document, headerRange, style, element)
          oldCommentElementsValue[element] = elementValue
        }
        const dateFormate = config.get('dateFormate', 'YYYY-MM-DD HH:mm:ss')

        let headerText = genNewHeader(
          editor.document,
          style,
          dateFormate,
          commentElements,
          commentElementsValue,
          customCommentElementsValue,
          oldCommentElementsValue
        )

        // add empty line, if it is single line, because our header always has multiple lines
        headerRange.isSingleLine ? (headerText += editor.document.eol === vscode.EndOfLine.LF ? '\r' : '\r\n') : null

        editBuilder.replace(headerRange, headerText)
      } catch (e: unknown) {
        logger.error('', e)
      }
    })
  }
}
// const throttleAddHeader = throttle(addHeader, config.get('throttleTime', 60000), { leading: true, trailing: false })
export { getHeaderRange, getElementValue, genNewHeader, addHeader, buildLine }
