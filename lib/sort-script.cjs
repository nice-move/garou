const { ESLint } = require('eslint');
const { createRequire } = require('module');

const { GarouError } = require('./utils.cjs');

function readConfig() {
  try {
    const requireFromCWD = createRequire(`${process.cwd()}/`);
    const { garou: { 'import-groups': config = [] } = {} } = requireFromCWD(
      './package.json',
    );
    return config.map((item) => (Array.isArray(item) ? item : [item]));
  } catch {
    return [];
  }
}

const baseConfig = {
  parserOptions: {
    ecmaVersion: 2021,
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
    'unicorn/no-useless-undefined': ['warn'],
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
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
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
      files: '*.jsx',
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
      files: '*.vue',
      plugins: ['vue'],
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

module.exports = function sortScript(files) {
  const eslint = new ESLint({
    allowInlineConfig: false,
    baseConfig,
    errorOnUnmatchedPattern: false,
    fix: true,
    useEslintrc: false,
    resolvePluginsRelativeTo: __dirname,
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
};
