/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-19 11:11:56                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-19 16:07:41                               *
 * @FilePath              : auto-header-plus/src/main/utils.js                *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/


const vscode = require('vscode')
const path = require('path')
const config = require('./config')
const logger = require('./logger')

const t = vscode.l10n.t
const execSync = require('child_process').execSync

/**
 * Run command and return result, if error, return empty string
 * @param {string} cmdRaw
 * @returns
 */
const executeCommand = (cmdRaw) => {
  let rst = ''
  try {
    rst = execSync(cmdRaw, {
      timeout: config.get('commandTimesOut') || 3000
    }).toString('utf8')
  } catch (e) {
    logger.error('', e)
  }

  if (rst.trim() === '') {
    logger.warn(t('Command {0} return empty, probably is caused by system busy', cmdRaw))
  }
  return rst.trimEnd()
}

/**
 * Get final string result
 * If string contains command ${cmd}, will running it and get the running result
 * @param {string} str string contains command ${cmd} or not
 */
const getFinalString = (str) => {
  const cmdReg = /\$\{(.+?)\}/g
  const cmds = str.match(cmdReg)
  let rtn = str
  if (cmds) {
    for (const cmd of cmds) {
      const cmdRaw = cmd.replace('${', '').replace('}', '')
      rtn = rtn.replace(cmd, executeCommand(cmdRaw))
    }
  }
  return rtn
}

/**
 * Get matched style from styles
 * @param {Object[]} styles styles from config
 * @param {string} ext file extension
 * @returns matched style
 */
const getApplyStyle = (styles, ext) => {
  const matchedStyle = []

  for (const key in styles) {
    if (!styles[key].applyTo) {
      continue
    }

    const applyTo = styles[key].applyTo.toLowerCase()

    const extArr = applyTo.replace(/[,|;|、|:|.|/||]/g, ' ').split(' ')

    extArr.includes(ext.replace('.', '').toLowerCase()) && isStyleValid(key, styles[key])
      ? matchedStyle.push(styles[key])
      : null
  }

  // only keep enabled style
  matchedStyle.filter((style) => style.enable)
  if (matchedStyle.length > 1) {
    logger.warn(t('Ext {0} duplicated in config', ext))
    return matchedStyle[0]
  } else if (matchedStyle.length === 1) {
    return matchedStyle[0]
  } else {
    logger.info(t('Ext {0} not found in config', ext))
    return undefined
  }
}

/**
 * Check style setting if has missing necessary symbol
 * @param {string} key 0, 1, 2, ...
 * @param {Object} style style raw
 * @param style style raw
 * @returns true if valid, false if not
 */
const isStyleValid = (key, style) => {
  // if turn off style check, always return true
  if (config.get('enableStyleCheck') === false) {
    return true
  }

  const firstLineSymbol = style.firstLineStart + style.firstLineMiddle + style.firstLineEnd
  const middleLineSymbol =
    style.middleLineStart + style.commentElementPrefix + style.commentElementSuffix + style.middleLineEnd
  const lastLineSymbol = style.lastLineStart + style.lastLineMiddle + style.lastLineEnd
  let isFirstLineSymbolValid = true
  let isMiddleLineSymbolValid = true
  let isLastLineSymbolValid = true

  switch (key) {
    case '0': {
      isFirstLineSymbolValid = firstLineSymbol.includes('/*') && !firstLineSymbol.includes('*/')
      isMiddleLineSymbolValid = !middleLineSymbol.includes('*/')
      isLastLineSymbolValid = lastLineSymbol.includes('*/')
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', '/*', '*/'))
      isMiddleLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'middle', '', '*/'))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', '', '*/'))
      return isFirstLineSymbolValid && isMiddleLineSymbolValid && isLastLineSymbolValid
    }
    case '1': {
      isFirstLineSymbolValid = firstLineSymbol.includes('<!--') && !firstLineSymbol.includes('-->')
      isMiddleLineSymbolValid = !middleLineSymbol.includes('-->')
      isLastLineSymbolValid = lastLineSymbol.includes('-->')
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', '<!--', '-->'))
      isMiddleLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'middle', '', '-->'))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', '', '-->'))
      return isFirstLineSymbolValid && isMiddleLineSymbolValid && isLastLineSymbolValid
    }
    case '2': {
      isFirstLineSymbolValid = firstLineSymbol.includes("'''")
      isLastLineSymbolValid = lastLineSymbol.includes("'''")
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', "'''"))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', "'''"))
      return isFirstLineSymbolValid && isLastLineSymbolValid
    }
    case '3': {
      isFirstLineSymbolValid = firstLineSymbol.includes("'")
      isMiddleLineSymbolValid = middleLineSymbol.includes("'")
      isLastLineSymbolValid = lastLineSymbol.includes("'")
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', "'"))
      isMiddleLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'middle', "'"))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', "'"))
      return isFirstLineSymbolValid && isMiddleLineSymbolValid && isLastLineSymbolValid
    }
    case '4': {
      isFirstLineSymbolValid = firstLineSymbol.includes('#')
      isLastLineSymbolValid = lastLineSymbol.includes('#')
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', '#'))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', '#'))
      return isFirstLineSymbolValid && isLastLineSymbolValid
    }
    case '5': {
      isFirstLineSymbolValid = firstLineSymbol.includes('--[[')
      isLastLineSymbolValid = lastLineSymbol.includes('--]]')
      isFirstLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'first', '--[['))
      isLastLineSymbolValid ? null : logger.warn(t('Style {0} {1} line error: {2} {3}', key, 'last', '--]]'))
      return isFirstLineSymbolValid && isLastLineSymbolValid
    }
    default:
      return false
  }
}

/**
 * Format date with simple tokens
 * Supported: YYYY MM DD HH mm ss
 */
/**
 * Format date with simple tokens
 * Supported: YYYY MM DD HH mm ss
 * @param {Date} date
 * @param {string} fmt
 * @returns {string}
 */
function formatDate(date, fmt) {
  date = date || new Date()
  fmt = fmt || 'YYYY-MM-DD HH:mm:ss'

  const pad = n => String(n).padStart(2, '0')

  const map = {
    YYYY: String(date.getFullYear()),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds())
  }

  return fmt.replace(/YYYY|MM|DD|HH|mm|ss/g, m => map[m])
}

/**
 * Get spec date value by key, if key is `CREATED_DATE` and oriVal is not empty, return oriVal
 * @param {string} key spec key
 * @param {string} fmt format
 * @param {string} oriVal original value
 * @returns {string} date value
 */
const getDateValue = (key, fmt, oriVal) => {
  const format = fmt || 'YYYY-MM-DD HH:mm:ss'

  switch (key) {
    case 'MODIFIED_DATE':
      return formatDate(new Date(), format)
    case 'CREATED_DATE':
      return oriVal
        ? formatDate(new Date(oriVal), format)
        : formatDate(new Date(), format)
    default:
      return ''
  }
}

/**
 * Get spec path value by key
 * @param {string} key spec key
 * @param {vscode.Uri} uri file path
 * @returns {string} path value
 */
const getPathValue = (key, uri) => {
  switch (key) {
    case 'FULL_PATH':
      return uri?.fsPath.replace(/\\/g, '/') || ''
    case 'RELATIVE_PATH': {
      return config.get('pathContainsWorkspaceFolder')
        ? vscode.workspace.asRelativePath(uri, true).replace(/\\/g, '/') || ''
        : vscode.workspace.asRelativePath(uri, false).replace(/\\/g, '/') || ''
    }
    case 'SHORTNAME_PATH':
      return path.basename(uri?.fsPath.replace(/\\/g, '/')) || ''
    default:
      return ''
  }
}

/**
 * Split paragraph into lines，
 * if the length of a line is greater than the specified width,
 * it will be split into multiple lines, `width`=0 disables this feature
 * @param {string} str paragraph
 * @param {number} width the width of each line
 * @returns {string[]} array of lines
 */
const splitString = (str, width) => {
  if (width > 0) {
    // only merge paragraph with one paragraph break,
    // if it has more than one paragraph break, it will be treated as a new paragraph
    str = str.replace(/(\S\s*)([\n|\r\n])(\s*\S)/gm, '$1 $2')
  }

  let bCount = 0
  let s = ''
  const arr = []
  const pattern = new RegExp('[\u4E00-\u9FA5]+') //Chinese character regular expression
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i)

    if (c === '\r') {
      // only newline with \n is enough, we skip \r
      continue
    } else if (c === '\n') {
      // newline
      arr.push(s)
      s = ''
      bCount = 0
      continue
    } else if (pattern.test(c)) {
      // treat Chinese character as 2 bytes
      bCount += 2
    } else {
      // treat English character as 1 byte
      bCount += 1
    }

    // join string
    s += str.charAt(i)
    // split it into a new line
    if (bCount >= width) {
      arr.push(s)
      s = ''
      bCount = 0
      continue
    }
    // if it is the last character, push it into array
    if (i === str.length - 1) {
      arr.push(s)
    }
  }
  return arr
}

module.exports = {
  executeCommand,
  getApplyStyle,
  getFinalString,
  getDateValue,
  getPathValue,
  splitString
}
