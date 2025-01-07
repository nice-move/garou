import { base as html } from '@nice-move/eslint-plugin-html/lib/configs-next.mjs';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticJsx from '@stylistic/eslint-plugin-jsx';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import tsParser from '@typescript-eslint/parser';
import sortClassMembers from 'eslint-plugin-sort-class-members';

import vueParser from 'vue-eslint-parser';

import { pluginMap, rules } from './plugins.mjs';
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

const padding = [
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
];

const comment = [
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
];

const quotes = [
  'warn',
  'single',
  {
    avoidEscape: true,
    allowTemplateLiterals: false,
  },
];

const props = [
  'warn',
  {
    callbacksLast: false,
    shorthandFirst: false,
    shorthandLast: false,
    ignoreCase: false,
    noSortAlphabetically: false,
    reservedFirst: true,
  },
];

const baseConfig = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,mts,cjs,cts,qs,wxs,vue}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        impliedStrict: true,
        globalReturn: true,
      },
    },
  },
  rules: {
    curly: ['warn', 'all'],
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
    'sort-class-members/sort-class-members': [
      'warn',
      {
        accessorPairPositioning: 'getThenSet',
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          'componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
          '[arrow-function-properties]',
          '[methods]',
          '[conventional-private-methods]',
          'render',
        ],
      },
    ],
    ...rules,
  },
  plugins: pluginMap,
};

export const options = {
  allowInlineConfig: false,
  errorOnUnmatchedPattern: false,
  fix: true,
  globInputPaths: false,
  overrideConfigFile: true,
  baseConfig: [
    sortClassMembers.configs['flat/recommended'],
    ...html,
    baseConfig,
    {
      files: ['**/*.md'],
      processor: 'garou/markdown',
      plugins: pluginMap,
    },
    {
      files: ['**/*.md/**'],
      languageOptions: {
        ecmaVersion: 'latest',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      languageOptions: {
        parser: tsParser,
      },
      rules: {
        'garou/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
      },
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: react,
    },
    {
      files: ['**/*.vue'],
      languageOptions: {
        ecmaVersion: 'latest',
        parser: vueParser,
      },
      rules: vue,
    },
    {
      files: [
        '**/*.cjs',
        '**/*.js',
        '**/*.jsx',
        '**/*.mjs',
        '**/*.qs',
        '**/*.vue',
        '**/*.wxs',
      ],
      plugins: {
        '@stylistic/js': stylisticJs,
      },
      rules: {
        '@stylistic/js/lines-between-class-members': 'warn',
        '@stylistic/js/padding-line-between-statements': padding,
        '@stylistic/js/quotes': quotes,
        '@stylistic/js/spaced-comment': comment,
      },
    },
    {
      files: ['**/*.ts', '**/*.mts', '**/*.cts', '**/*.tsx'],
      plugins: {
        '@stylistic/ts': stylisticTs,
        '@stylistic/js': stylisticJs,
      },
      rules: {
        '@stylistic/js/quotes': quotes,
        '@stylistic/js/spaced-comment': comment,
        '@stylistic/ts/lines-between-class-members': 'warn',
        '@stylistic/ts/padding-line-between-statements': padding,
      },
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      plugins: {
        '@stylistic/jsx': stylisticJsx,
      },
      rules: {
        '@stylistic/jsx/jsx-sort-props': props,
        '@stylistic/jsx/jsx-self-closing-comp': 'warn',
        '@stylistic/jsx/jsx-curly-brace-presence': [
          'warn',
          { props: 'never', children: 'ignore' },
        ],
      },
    },
  ],
};
