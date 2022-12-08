import { Text } from 'fs-chain';

import { ruleOther } from '../lib/handle-style/other.mjs';

new Text(import.meta.url)
  .onDone(() =>
    [
      `'use strict';`,
      '',
      'module.exports = {',
      ...Object.keys(ruleOther).map(
        (item) => `'${item}': require('stylelint/lib/rules/${item}/index.js'),`,
      ),
      '};',
    ].join('\n'),
  )
  .output('../rules.cjs')
  .logger('copy rules list');

export const config = {
  target: 'node16',
  entry: {
    cli: './lib/cli.mjs',
  },
  output: {
    path: 'dist',
    module: true,
  },
  externals: {
    '@yarnpkg/lockfile': 'node-commonjs @yarnpkg/lockfile',
    'eslint-module-utils/resolve':
      'node-commonjs eslint-module-utils/resolve.js',
    'flat-cache': 'node-commonjs flat-cache',
    'postcss-sass': 'node-commonjs postcss-sass',
    'postcss-styl': 'node-commonjs postcss-styl',
    'write-file-atomic': 'node-commonjs write-file-atomic',
    eslint: 'module eslint',
    sugarss: 'node-commonjs sugarss',
  },
  replace: [
    {
      from: 'stylelint/lib/rules/index.js',
      to: new URL('rules.cjs', import.meta.url),
    },
    {
      from: 'stylelint/lib/formatters/index.js',
      to: new URL('formatters.cjs', import.meta.url),
    },
  ],
};
