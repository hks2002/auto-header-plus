/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-19 12:00:23                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 19:07:28                                *
 * @FilePath              : auto-header-plus/src/main/newHandler.js            *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const vscode = require('vscode')
const config = require('./config')
const logger = require('./logger')
const { addHeader } = require('./core')

const t = vscode.l10n.t

/**
 * Handles the new file operation event
 */
const newHandler = () => {
  if (config.get('enableAutoAddOnNew')) {
    addHeader()
  } else {
    logger.info(t('Auto add on new is disabled'))
  }
}

module.exports = newHandler
