import { pluginMap, plugins, rules } from './plugins.mjs';
import { rules as react } from './react.mjs';
import { rules as vue } from './vue.mjs';

const always = [
  'iife',
  'class',
  'function',
  'export',
  'cjs-import',
  'cjs-export',
  'block-like',
  'return',
];

const never = ['break', 'case', 'default', 'continue', 'debugger', 'switch'];

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
        next: always,
      },
      {
        blankLine: 'always',
        prev: ['directive', 'import', ...always],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: '*',
        next: never,
      },
      {
        blankLine: 'never',
        prev: never,
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'never',
        prev: 'cjs-import',
        next: 'cjs-import',
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
      files: ['*.ts', '*.tsx', '*.cts', '*.mts'],
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
