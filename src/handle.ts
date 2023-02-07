/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-03 23:59:50                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-07 15:24:40                               *
 * @FilePath              : auto-header-plus/src/handle.ts                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

import * as vscode from 'vscode'
import { logger } from './extension'
import { addHeader } from './header'
import { config } from './utils'
const t = vscode.l10n.t

const handleNew = () => {
  logger.debug('New file')
  if (config().get('enableAutoAddOnNew')) {
    addHeader()
  } else {
    logger.info(t('Auto add on new is disabled'))
  }
}

const handleSave = (e: vscode.TextDocumentWillSaveEvent) => {
  logger.debug('Save file')
  if (config().get('enableAutoAddOnSave')) {
    e.document.isDirty ? addHeader() : logger.info(t('File not changed'))
  } else {
    logger.info(t('Auto add on save is disabled'))
  }
}

export { handleNew, handleSave }
