/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-19 12:00:23                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 20:00:37                                *
 * @FilePath              : auto-header-plus/src/saveHandler.js                *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import { config } from './config.js'
import { logger } from './logger.js'
import { addHeader } from './core.js'
import { getL10n } from './l10n.js'

const saveHandler = (e) => {
  // Check if auto add on save is enabled in configuration
  if (!config.get('enableAutoAddOnSave')) {
    // Log message if auto add on save is disabled
    logger.info(getL10n('Auto add on save is disabled'))
    return
  }

  const editPromise = addHeader()
  if (editPromise) {
    e.waitUntil(Promise.resolve(editPromise))
  }
}
export { saveHandler }
