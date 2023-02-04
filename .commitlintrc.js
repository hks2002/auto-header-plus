/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-02-04 14:25:55                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-02-04 20:33:19                               *
 * @FilePath              : auto-header-plus/.commitlintrc.js                 *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/

/* eslint-disable */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'docs',
        'perf',
        'init',
        'test',
        'refactor',
        'patch',
        'file',
        'publish',
        'tag',
        'config',
        'git',
        'build',
        'chore',
        'ci',
        'revert'
      ]
    ]
  }
}
