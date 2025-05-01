import { Json } from 'fs-chain';
import { defineConfig } from 'tsdown';

new Json(process.cwd())
  .config({ pretty: true })
  .source('node_modules/@stylistic/stylelint-plugin/package.json')
  .onDone(({ exports: _, ...rest }) => ({ ...rest }))
  .output()
  .logger('hack');

export default defineConfig({
  entry: 'lib/cli.mjs',
  format: 'module',
  clean: ['dist/*'],
  target: 'node20.18',
  fixedExtension: true,
  platform: 'node',
  minify: true,
  external: [
    'cheetor',
    'postcss-sass',
    'postcss-styl',
    'sugarss',
    'eslint-module-utils/resolve',
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
  ],
});
