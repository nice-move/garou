import { builtinModules, createRequire } from 'module';

import { ESLint } from 'eslint';

import { GarouError } from './utils.mjs';

function readConfig() {
  try {
    const requireFromCWD = createRequire(`${process.cwd()}/`);
    const {
      'nice-move': { 'import-groups': Config = [] } = {},
      garou: { 'import-groups': config = Config } = {},
    } = requireFromCWD('./package.json');
    return Array.isArray(config)
      ? config.map((item) => (Array.isArray(item) ? item : [item]))
      : [[config]];
  } catch {
    return [];
  }
}

const builtin = builtinModules.filter(
  (item) => !(item.includes('/') || item.startsWith('_')),
);

const baseConfig = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'html',
    'import',
    'simple-import-sort',
    'sort-class-members',
    'unicorn',
  ],
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
    'unicorn/no-useless-undefined': 'warn',
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
    'import/newline-after-import': ['warn', { count: 1 }],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['class', 'export', 'function', 'cjs-export'],
      },
    ],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          [`^(${builtin.join('|')})(/|$)`],
          ['^@?\\w'],
          ...readConfig(),
          ['^@\\/'],
          ['^'],
          ['^\\.\\/.*\\/'],
          ['^\\.\\/'],
        ],
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
    'sort-class-members/sort-class-members': [
      'warn',
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
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
          'render',
        ],
      },
    ],
  },
  overrides: [
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
      },
    },
    {
      files: '*.jsx',
      rules: {
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
      files: '*.vue',
      plugins: ['vue'],
      parserOptions: {
        ecmaVersion: 2021,
      },
      parser: 'vue-eslint-parser',
      rules: {
        'vue/html-self-closing': [
          'warn',
          {
            html: {
              void: 'always',
              normal: 'always',
              component: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
        'vue/attributes-order': ['warn', { alphabetical: true }],
        'vue/order-in-components': 'warn',
      },
    },
  ],
};

export function handleScript(files) {
  const eslint = new ESLint({
    allowInlineConfig: false,
    baseConfig,
    errorOnUnmatchedPattern: false,
    fix: true,
    useEslintrc: false,
  });

  return eslint.lintFiles(files).then((results) => {
    const error = results.find(({ messages }) =>
      messages.find(({ fatal }) => fatal),
    );

    if (error) {
      throw new GarouError(
        error.messages.find(({ fatal }) => fatal).message,
        error.filePath,
      );
    }

    return ESLint.outputFixes(results);
  });
}
