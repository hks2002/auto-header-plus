/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 20:40:57                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-07 15:22:50                               *
 * @FilePath              : auto-header-plus/src/utils.ts                     *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import dayjs from 'dayjs'
import * as path from 'path'
import * as vscode from 'vscode'
import packageJson from '../package.json'
import { logger } from './extension'

const t = vscode.l10n.t
const execSync = require('child_process').execSync

const config = () => {
  return vscode.workspace.getConfiguration(packageJson.name)
}
/**
 * Run command and return result, if error, return empty string
 * @param command
 * @returns
 */
const executeCommand = (command: string): string => {
  let rst = ''
  try {
    rst = execSync(command, {
      encoding: 'utf8',
      timeout: 1000,
      cmd: vscode.workspace.asRelativePath
    })
  } catch (e: unknown) {
    logger.error('', e)
  }

  if (rst.trim() === '') {
    logger.warn(t('Command {0} return empty', command))
  }
  return rst.trimEnd()
}

/**
 * Get string true value from string contains command ${cmd}
 * @param str string contains command ${cmd} or not
 */
const getFinalStringContainsCmd = (str: string): string => {
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
 * @param styles styles from config
 * @param ext file extension
 * @returns
 */
const getApplyStyle = (styles: ahp.Styles, ext: string): ahp.StyleRaw | undefined => {
  const matchedStyle: ahp.StyleRaw[] = []

  for (const key in styles) {
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
 * @param key 0, 1, 2, ...
 * @param style style raw
 * @returns
 */
const isStyleValid = (key: string, style: ahp.StyleRaw): boolean => {
  // if turn off style check, always return true
  if (config().get('enableStyleCheck') === false) {
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
 * Get spec date value by key, if key is `CREATEDDATE` and oriVal is not empty, return oriVal
 * @param key spec key
 * @fmt fmt format
 * @param oriVal original value
 * @returns
 */
const getDateValue = (key: string, fmt?: string, oriVal?: string): string => {
  switch (key) {
    case 'MODIFIEDDATE':
      return dayjs().format(fmt || 'YYYY-MM-DD HH:mm:ss')
    case 'CREATEDDATE':
      return oriVal ? dayjs(oriVal).format(fmt || 'YYYY-MM-DD HH:mm:ss') : dayjs().format(fmt || 'YYYY-MM-DD HH:mm:ss')
    default:
      return ''
  }
}

/**
 * Get spec path value by key
 * @param key spec key
 * @param filePath file path
 * @returns
 */
const getPathValue = (key: string, uri: vscode.Uri): string => {
  switch (key) {
    case 'FULLPATH':
      return uri?.fsPath.replace(/\\/g, '/') || ''
    case 'RELATIVEPATH': {
      return vscode.workspace.asRelativePath(uri, true).replace(/\\/g, '/') || ''
    }
    case 'SHORTNAMEPATH':
      return path.basename(uri?.fsPath.replace(/\\/g, '/')) || ''
    default:
      return ''
  }
}

/**
 * Split paragraph into lines，
 * if the length of a line is greater than the specified width,
 * it will be split into multiple lines, `width`=0 disables this feature
 * @param str paragraph
 * @param width the width of each line
 * @returns
 */
const splitString = (str: string, width: number): string[] => {
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
export { getApplyStyle, executeCommand, getFinalStringContainsCmd, getDateValue, getPathValue, splitString, config }
