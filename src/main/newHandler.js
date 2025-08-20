/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2025-08-19 12:00:23                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 13:14:10                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

const vscode = require('vscode')
const config = require('./config')
const logger = require('./logger')
const { addHeader } = require('./core')

const t = vscode.l10n.t

/**
 * Handles the new file operation event
 * @param {vscode.FileCreateEvent} e - The event object containing document information
 */
const newHandler = (e) => {
  if (config.get('enableAutoAddOnNew')) {
    addHeader()
  } else {
    logger.info(t('Auto add on new is disabled'))
  }
}

module.exports = newHandler
