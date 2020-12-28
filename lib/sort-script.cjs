const { ESLint } = require('eslint');
const { resolve } = require('path');

function readConfig() {
  try {
    const { garou: { 'import-groups': config = [] } = {} } = require(resolve(
      process.cwd(),
      'package.json',
    ));
    return config;
  } catch {
    return [];
  }
}

const baseConfig = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['html', 'sort-class-members', 'simple-import-sort'],
  rules: {
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^\\u0000'],
          ['^@?\\w'],
          ...readConfig(),
          ['^@/'],
          ['^'],
          ['^\\./'],
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
      },
    },
  ],
};

module.exports = function sortScript(files) {
  const eslint = new ESLint({
    allowInlineConfig: false,
    baseConfig,
    fix: true,
    globInputPaths: false,
    useEslintrc: false,
    ignore: false,
  });

  return eslint.lintFiles(files).then((results) => ESLint.outputFixes(results));
};
