/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 13:57:38                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-05 03:46:28                               *
 * @FilePath              : auto-header-plus/.releaserc.js                    *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/* eslint-disable */
module.exports = {
  'repositoryUrl': 'https://github.com/hks2002/auto-header-plus.git',
  'branches': 'master',
  'tagFormat': 'v${version}',
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        'npmPublish': false,
        'tarballDir': 'dist'
      }
    ],
    [
      '@semantic-release/git',
      {
        'assets': ['package.json', 'CHANGELOG.md'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    '@semantic-release/github'
  ]
}
