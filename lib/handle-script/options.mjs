import { pluginMap, plugins, rules } from './plugins.mjs';

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
    'array-callback-return': [
      'warn',
      {
        allowImplicit: true,
      },
    ],
    'arrow-body-style': [
      'warn',
      'as-needed',
      {
        requireReturnForObjectLiteral: false,
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['class', 'export', 'function', 'cjs-export'],
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
      plugins: ['react'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'react/jsx-boolean-value': ['warn', 'always'],
        'react/jsx-curly-brace-presence': [
          'warn',
          { props: 'never', children: 'ignore' },
        ],
        'react/jsx-sort-props': [
          'warn',
          {
            callbacksLast: false,
            shorthandFirst: false,
            shorthandLast: false,
            ignoreCase: false,
            noSortAlphabetically: false,
            reservedFirst: ['key'],
          },
        ],
        'react/self-closing-comp': 'warn',
      },
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
      rules: {
        'vue/attributes-order': [
          'warn',
          {
            alphabetical: true,
          },
        ],
        'vue/html-comment-content-newline': 'warn',
        'vue/html-comment-content-spacing': 'warn',
        'vue/html-comment-indent': 'warn',
        'vue/html-self-closing': 'warn',
        'vue/order-in-components': 'warn',
        'vue/padding-line-between-blocks': 'warn',
      },
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
