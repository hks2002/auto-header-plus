/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 13:57:38                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-08-20 19:36:15                               *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/* eslint-disable */
export default {
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
        'message': 'semantic-release: ${nextRelease.version}\n\n${nextRelease.notes}'
      }
    ],
    '@semantic-release/github'
  ]
}
