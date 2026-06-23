/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2026-06-23 16:38:46                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 19:58:36                                *
 * @FilePath              : auto-header-plus/src/l10n.js                       *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as vscode from 'vscode'
import defaultL10n from '../l10n/bundle.l10n.json' with { type: 'json' }

const locale = vscode.env.language

const formatString = (str, params) => {
  if (!params || params.length === 0) return str
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    return params[index] !== undefined ? params[index] : match
  })
}

const getL10n = (key, ...params) => {
  if (locale === 'en') {
    const raw = defaultL10n[key] || key
    return formatString(raw, params)
  } else {
    return vscode.l10n.t(key, ...params)
  }
}
export { getL10n }
