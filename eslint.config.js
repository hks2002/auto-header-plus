/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2026-01-18 12:41:42                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-19 02:33:26                               *
 * @FilePath              : auto-header-plus/eslint.config.js                 *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/



const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { 
      globals: { 
        ...globals.node,
        ...globals.browser
      }
    },
    rules: {
      ...js.configs.recommended.rules
    }
  }
];