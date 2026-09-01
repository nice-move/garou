import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'lib/cli.mjs',
  format: 'module',
  clean: ['dist/*'],
  target: 'node22.18',
  fixedExtension: true,
  platform: 'node',
  minify: true,
  deps: {
    onlyBundle: false,
    neverBundle: [
      '@eslint-community/eslint-utils',
      '@stylistic/eslint-plugin',
      '@stylistic/stylelint-plugin',
      '@typescript-eslint/parser',
      'eslint-module-utils/resolve',
      'eslint-scope',
      'eslint',
      'eslint/use-at-your-own-risk',
      'postcss-sass',
      'postcss-styl',
      'stylelint-scss',
      'stylelint',
      'sugarss',
      'typescript',
      'vue-eslint-parser',
    ],
  },
});
