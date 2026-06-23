/*******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                      *
 * @CreatedDate           : 2026-06-23 11:18:58                                *
 * @LastEditors           : Robert Huang<56649783@qq.com>                      *
 * @LastEditDate          : 2026-06-23 15:22:02                                *
 * @FilePath              : emoji-commit-tiny/esbuild.js                       *
 * @CopyRight             : MerBleueAviation                                   *
 ******************************************************************************/
import * as esbuild from 'esbuild'

const isWatch = process.argv.includes('--watch')

const buildOptions = {
  entryPoints: ['src/extension.js'],
  bundle: true,
  external: ['vscode'],
  format: 'esm',
  outfile: 'dist/extension.js',
  platform: 'node',
  sourcemap: false,
  minify: !isWatch,
}

if (isWatch) {
  const ctx = await esbuild.context(buildOptions)
  await ctx.watch()
  console.log('watching...')
} else {
  await esbuild.build(buildOptions)
}
