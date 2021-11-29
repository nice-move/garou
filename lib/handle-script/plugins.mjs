import { builtinModules } from 'module';

import newlineAfterImport from 'eslint-plugin-import/lib/rules/newline-after-import.js';
import processor from 'eslint-plugin-markdown/lib/processor.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortClassMembers from 'eslint-plugin-sort-class-members/dist/rules/sort-class-members.js';
import { getPkg } from 'settingz';

import react from './react.cjs';
import vue from './vue.cjs';

function readConfig() {
  try {
    const {
      'nice-move': { 'import-groups': Config = [] } = {},
      garou: { 'import-groups': config = Config } = {},
    } = getPkg();
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

export const plugins = ['garou'];

export const pluginMap = {
  garou: {
    processors: {
      markdown: processor,
    },
    rules: {
      'sort-imports': simpleImportSort.rules.imports,
      'sort-exports': simpleImportSort.rules.exports,
      'sort-class': sortClassMembers.sortClassMembersRule,
      'newline-after-import': newlineAfterImport,
    },
  },
  react,
  vue,
};

export const rules = {
  'garou/newline-after-import': ['warn', { count: 1 }],
  'garou/sort-class': [
    'warn',
    {
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
  'garou/sort-exports': 'warn',
  'garou/sort-imports': [
    'warn',
    {
      groups: [
        ['^\\u0000'],
        [`^(node:)?(${builtin.join('|')})(/|$)`],
        ['^@?\\w'],
        ...readConfig(),
        ['^@\\/'],
        ['^'],
        ['^\\.\\/.*\\/'],
        ['^\\.\\/'],
      ],
    },
  ],
};
