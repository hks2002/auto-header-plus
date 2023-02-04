/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 13:57:38                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-04 19:55:26                               *
 * @FilePath              : auto-header-plus/.releaserc.js                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/* eslint-disable */
module.exports = {
  'branches': ['master'],
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog'
    // disable '@semantic-release/npm',
    // '@semantic-release/github'
  ],
  'ci': false,
  'dryRun': true
}
