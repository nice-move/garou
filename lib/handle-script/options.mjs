import { pluginMap, plugins, rules } from './plugins.mjs';
import { rules as react } from './react.mjs';
import { rules as vue } from './vue.mjs';

const element = ['iife', 'class', 'export', 'function', 'cjs-export'];

const baseConfig = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins,
  rules: {
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
    'no-useless-rename': 'warn',
    'prefer-exponentiation-operator': 'warn',
    'prefer-template': 'warn',
    'object-shorthand': [
      'warn',
      'always',
      {
        avoidQuotes: true,
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: element,
      },
      {
        blankLine: 'always',
        prev: element,
        next: '*',
      },
    ],
    'lines-between-class-members': 'warn',
    'spaced-comment': [
      'warn',
      'always',
      {
        block: {
          balanced: true,
          exceptions: ['-', '+', '/', '*'],
          markers: ['=', '!', ':', '::', '/', '*'],
        },
        line: {
          exceptions: ['-', '+', '/', '*'],
          markers: ['=', '!', '/', '*'],
        },
      },
    ],
    ...rules,
  },
  overrides: [
    { files: ['*.cjs', '*.mjs'] },
    {
      files: '*.md',
      processor: 'garou/markdown',
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: ['*.jsx', '*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: react,
    },
    {
      files: ['*.{html,htm}'],
      plugins: ['html'],
      settings: {
        'html/html-extensions': ['.html', '.htm'],
      },
    },
    {
      files: ['*.svg'],
      plugins: ['html'],
      settings: {
        'html/xml-extensions': ['.svg'],
      },
    },
    {
      files: '*.vue',
      plugins: ['vue'],
      parserOptions: {
        ecmaVersion: 2022,
      },
      parser: 'vue-eslint-parser',
      rules: vue,
    },
  ],
};

export const options = {
  allowInlineConfig: false,
  baseConfig,
  errorOnUnmatchedPattern: false,
  fix: true,
  globInputPaths: false,
  plugins: pluginMap,
  useEslintrc: false,
};
