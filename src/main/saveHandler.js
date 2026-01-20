/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-19 12:00:23                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-01-20 19:07:59                                *
 * @FilePath              : auto-header-plus/src/main/saveHandler.js           *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
const vscode = require('vscode')
const config = require('./config')
const logger = require('./logger')
const { addHeader } = require('./core')

const t = vscode.l10n.t

/**
 * Handles the save operation event
 * @param {vscode.TextDocumentWillSaveEvent} e - The event object containing document information
 */
const saveHandler = (e) => {
  // Check if auto add on save is enabled in configuration
  if (config.get('enableAutoAddOnSave')) {
    // If document has unsaved changes, add header
    e.document.isDirty ? addHeader() : logger.info(t('File not changed'))
  } else {
    // Log message if auto add on save is disabled
    logger.info(t('Auto add on save is disabled'))
  }
} 

module.exports = saveHandler
