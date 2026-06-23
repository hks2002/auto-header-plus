/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2025-08-19 12:00:23                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 20:00:26                                *
 * @FilePath              : auto-header-plus/src/newHandler.js                 *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import { config } from './config.js'
import { logger } from './logger.js'
import { addHeader } from './core.js'
import { getL10n } from './l10n.js'

/**
 * Handles the new file operation event
 */
const newHandler = () => {
  if (config.get('enableAutoAddOnNew')) {
    addHeader()
  } else {
    logger.info(getL10n('Auto add on new is disabled'))
  }
}

export { newHandler }
