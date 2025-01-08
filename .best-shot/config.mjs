// import { RsdoctorWebpackPlugin } from '@rsdoctor/webpack-plugin';
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
  externals: [
    '@eslint-community/eslint-utils',
    '@stylistic/eslint-plugin-js',
    '@stylistic/eslint-plugin-jsx',
    '@stylistic/eslint-plugin-ts',
    '@typescript-eslint/parser',
    'eslint-scope',
    'eslint',
    'eslint/use-at-your-own-risk',
    'stylelint',
    'typescript',
    'vue-eslint-parser',
    Object.fromEntries(
      [
        'postcss-sass',
        'postcss-styl',
        'sugarss',
        'stylelint-scss/src/rules/dollar-variable-empty-line-before/index.js',
        'stylelint-scss/src/rules/double-slash-comment-empty-line-before/index.js',
        '@yarnpkg/lockfile',
        'eslint-module-utils/resolve',
      ].map((key) => [key, `node-commonjs ${key}`]),
    ),
  ],
  externalsType: 'module-import',
  // chain(chain) {
  // chain.plugin('rsdoctor').use(RsdoctorWebpackPlugin, [
  //   {
  //     port: 5858,
  //   },
  // ]);
  // },
};
