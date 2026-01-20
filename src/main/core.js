/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-19 23:31:28                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 18:59:23                                *
 * @FilePath              : auto-header-plus/src/main/core.js                  *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const path = require('path')
const vscode = require('vscode')
const logger = require('./logger')
const { getApplyStyle, getDateValue, getFinalString, getPathValue, splitString } = require('./utils')
const SPEC_VALUE = ['MODIFIED_DATE', 'CREATED_DATE', 'FULL_PATH', 'RELATIVE_PATH', 'SHORTNAME_PATH']

const config = require('./config')

const t = vscode.l10n.t

/**
 * Find header range in document by style setting,
 * comment start logic seq: `start`>`middle`>`end`,
 * comment end logic seq: `end`>`middle`>`start`,
 *
 * It assumes that the header comment block's first character at the first col 0,
 * and the header comment block's last character is end with a new empty line,
 * if not found, `Range(0,0,0,0)` will be returned
 * @param {vscode.TextDocument} doc document
 * @param {Object} style style setting
 * @returns
 */
const getHeaderRange = (doc, style) => {
  let startLine = 0
  let startChar = 0
  let endLine = 0
  let endChar = 0

  const firstLineSymbol = style.firstLineStart || style.firstLineMiddle || style.firstLineEnd || '/**'
  const lastLineSymbol = style.lastLineEnd || style.lastLineMiddle || style.lastLineStart || '**/'
  const middleLineSymbol = style.middleLineStart || ' * '

  // Check if it's a shell file and has a shebang line
  const hasShebang = doc.lineCount > 0 && doc.lineAt(0).text.startsWith("#!")
  console.debug('hasShebang:', hasShebang)

  // Set initial start line based on shebang presence
  startLine = hasShebang ? 1 : 0
  endLine = startLine

  // find first line start
  let foundStart = false
  for (let i = startLine; i < doc.lineCount; i++) {
    const lineProp = doc.lineAt(i)
    if (lineProp.isEmptyOrWhitespace) {
      continue
    }
    // Check if line starts with firstLineSymbol (ignoring leading whitespace)
    if (lineProp.text.trim().startsWith(firstLineSymbol.trim())) {
      startLine = i
      startChar = lineProp.text.indexOf(firstLineSymbol.trim())
      foundStart = true
      break // once found, break for loop
    }
  }
  
  // find last line, from the first line start line
  if (foundStart) {
    // Set initial end line to start line
    endLine = startLine
    
    // Continue searching until we find the end line or reach the end of file
    for (let i = startLine + 1; i < doc.lineCount; i++) {
      const lineProp = doc.lineAt(i)
      const lineText = lineProp.text.trim()
      
      // Check if this is the end line
      if (lineText.endsWith(lastLineSymbol.trim())) {
        endLine = i
        endChar = lineProp.text.length
        break
      }
      // Check if this is a middle line (part of the header)
      else if (lineText.startsWith(middleLineSymbol.trim())) {
        // This is part of the header, continue searching
        endLine = i
      }
      // If it's neither, we've reached the end of the header
      else {
        break
      }
    }
    
    // Make sure we found the end line
    if (endLine === startLine) {
      // If end line not found, try to find any line with the end symbol
      for (let i = startLine; i < doc.lineCount; i++) {
        const lineProp = doc.lineAt(i)
        if (lineProp.text.trim().endsWith(lastLineSymbol.trim())) {
          endLine = i
          endChar = lineProp.text.length
          break
        }
      }
    }
  }
  
  // If no header comment found but has shebang, return range starting from line 1
  if (!foundStart && hasShebang) {
    return new vscode.Range(1, 0, 1, 0)
  }

  return new vscode.Range(startLine, startChar, endLine, endChar)
}

/**
 * get text of element value parts
 * @param {string} scr
 * @param {string} target
 * @returns
 */
const getTxt = (scr, target) => {
  const idx = scr.indexOf(target)
  const len = target.length

  if (idx > -1) {
    const toBeFound = scr.slice(idx + len)
    const found = toBeFound.match(/(\W*\s+)(.*)(\s*\W)/i)
    return found && found.length > 0 ? found[2] : ''
  } else {
    return ''
  }
}

/**
 * Get header comment value by header range
 * @param {vscode.TextDocument} doc document
 * @param {vscode.Range} range Header range
 * @param {string} targetElement Comment Element
 * @returns
 */
const getElementValue = (doc, range, targetElement) => {
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

    // build by other tools, we guess the name of element
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
 * @param {string} s
 * @param {string} m
 * @param {string} e
 * @param {number} width
 * @returns
 */
const buildLine = (s, m, e, width) => {
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
 * @param {vscode.TextDocument} doc
 * @param {Object} style
 * @param {string} dateFormat
 * @param {string[]} commentElements
 * @param {Object} commentElementsValues
 * @param {Object} customCommentElementsValues
 * @param {Object} oldCommentElementsValues
 * @returns
 */
const genNewHeader = (
  doc,
  style,
  dateFormat,
  commentElements,
  commentElementsValues,
  customCommentElementsValues,
  oldCommentElementsValues
) => {
  let headerText = ''
  const allCreateDateDiff = config.get('allCreateDateDiff', true)
  const eolText = doc.eol === vscode.EndOfLine.LF ? '\n' : '\r\n'

  // firstLine
  headerText += buildLine(style.firstLineStart, style.firstLineMiddle, style.firstLineEnd, style.lineWidth) + eolText

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
      elementValueText = getFinalString(elementValue) || ''
      const ELEMENT_VALUE_TEXT = elementValueText.toUpperCase()

      SPEC_VALUE.includes(ELEMENT_VALUE_TEXT) && ELEMENT_VALUE_TEXT.endsWith('PATH')
        ? (elementValueText = getPathValue(ELEMENT_VALUE_TEXT, doc.uri))
        : null

      SPEC_VALUE.includes(ELEMENT_VALUE_TEXT) && ELEMENT_VALUE_TEXT.endsWith('DATE')
        ? (elementValueText = getDateValue(
          ELEMENT_VALUE_TEXT,
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
      style.middleLineEnd.length > 0 ? ' ' : '',
      style.middleLineEnd,
      style.lineWidth
    ) + eolText
  }

  // additional comment
  const additionalComment = config.get('additionalComment', '')
  if (additionalComment.length > 0) {
    const additionalCommentText = getFinalString(additionalComment) || ''
    splitString(additionalCommentText, style.lineWidth).forEach((line) => {
      headerText += buildLine(style.middleLineStart + line, ' ', style.middleLineEnd, style.lineWidth) + eolText
    })
  }

  // lastLine
  headerText += buildLine(style.lastLineStart, style.lastLineMiddle, style.lastLineEnd, style.lineWidth)

  return headerText
}

const addHeader = () => {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    editor.edit((editBuilder) => {
      try {
        logger.info(t('Adding header to {0}', editor.document.fileName))
        const ext = path.extname(editor.document.fileName)

        const style = getApplyStyle(config.get('style'), ext)
        if (!style) {
          return
        }
        logger.debug(`style: ${JSON.stringify(style)}`)

        const headerRange = getHeaderRange(editor.document, style)

        const commentElements = config.get('commentElements', [])
        const commentElementsValue = config.get('commentElementsValue', {})
        const customCommentElementsValue = config.get('customCommentElementsValue', {})
        const oldCommentElementsValue = {}
        for (const element of commentElements) {
          const elementValue = getElementValue(editor.document, headerRange, element)
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
        logger.info(`${headerRange.start.line.toString()}  ${headerRange.end.line.toString()}`)
        editBuilder.replace(headerRange, headerText)
      } catch (e) {
        logger.error('', e)
      }
    })
  }
}
// const throttleAddHeader = throttle(addHeader, config.get('throttleTime', 60000), { leading: true, trailing: false })
module.exports = { getHeaderRange, addHeader, buildLine, genNewHeader, getElementValue }