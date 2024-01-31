import { Json } from 'fs-chain';

new Json(process.cwd())
  .config({ pretty: true })
  .source('node_modules/@stylistic/stylelint-plugin/package.json')
  .onDone(({ exports, ...rest }) => ({ ...rest }))
  .output()
  .logger('hack');

export const config = {
  target: 'node18',
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
    // 'flat-cache': 'node-commonjs flat-cache',
    'postcss-sass': 'node-commonjs postcss-sass',
    'postcss-styl': 'node-commonjs postcss-styl',
    // 'write-file-atomic': 'node-commonjs write-file-atomic',
    eslint: 'module eslint',
    stylelint: 'node-commonjs stylelint',
    sugarss: 'node-commonjs sugarss',
  },
};
