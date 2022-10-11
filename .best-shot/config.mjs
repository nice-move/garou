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
  target: 'node14',
  entry: {
    cli: './lib/cli.mjs',
    parser: 'vue-eslint-parser',
  },
  output: {
    path: 'dist',
  },
  externals: {
    'postcss-styl': 'node-commonjs postcss-styl',
    'postcss-sass': 'node-commonjs postcss-sass',
    eslint: 'node-commonjs eslint',
    sugarss: 'node-commonjs sugarss',
    yargs: 'node-commonjs yargs',
  },
  chain(chain) {
    chain.optimization.splitChunks({
      cacheGroups: {
        default: {
          chunks: 'initial',
          minChunks: 2,
          name: 'common',
          reuseExistingChunk: true,
        },
      },
    });
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
