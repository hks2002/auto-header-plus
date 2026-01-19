/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2026-01-18 13:16:11                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2026-01-19 16:12:59                               *
 * @FilePath              : auto-header-plus/esbuild.config.js                *
 * @CopyRight             : MerBleueAviation                                  *
 *****************************************************************************/












const esbuild = require('esbuild');

const options = {
  entryPoints: ['./src/main/extension.js'],
  outfile: './dist/extension.js',
  bundle: true,
  target: 'node16',
  format: 'cjs',
  platform: 'node',
  external: ['vscode'],
  minify: true,
  sourcemap: false,
  treeShaking: true,
  legalComments: 'none'
};

if (process.argv.includes('--watch')) {
  // @ts-ignore
  esbuild.context(options).then(context => context.watch());
} else {
  // @ts-ignore
  esbuild.build(options);
}