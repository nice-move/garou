import { builtinModules } from 'node:module';

import htmlProcessors from '@nice-move/eslint-plugin-html/lib/processor.cjs';
import consistentTypeSpecifierStyle from 'eslint-plugin-import/lib/rules/consistent-type-specifier-style.js';
import importFirst from 'eslint-plugin-import/lib/rules/first.js';
import importNoDuplicates from 'eslint-plugin-import/lib/rules/no-duplicates.js';
import markdownProcessor from 'eslint-plugin-markdown/lib/processor.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { sortClassMembersRule } from 'eslint-plugin-sort-class-members/dist/rules/sort-class-members.js';
import { getPkg } from 'settingz/index.mjs';

import { parseImportGroups } from '../utils/lib.mjs';

import { plugin as react } from './react.mjs';
import { plugin as vue } from './vue.mjs';

function readConfig() {
  try {
    const {
      'nice-move': { 'import-groups': Config = [] } = {},
      garou: { 'import-groups': config = Config } = {},
    } = getPkg();

    return parseImportGroups(config);
  } catch {
    return [];
  }
}

const builtin = builtinModules.filter(
  (item) => !(item.includes('/') || item.startsWith('_')),
);

export const pluginMap = {
  garou: {
    processors: {
      markdown: markdownProcessor,
      html: htmlProcessors.processor,
    },
    rules: {
      'import-first': importFirst,
      'import-no-duplicates': importNoDuplicates,
      'consistent-type-specifier-style': consistentTypeSpecifierStyle,
      'sort-class': sortClassMembersRule,
      'sort-exports': simpleImportSort.rules.exports,
      'sort-imports': simpleImportSort.rules.imports,
    },
  },
  'garou-react': react,
  'garou-vue': vue,
};

export const plugins = Object.keys(pluginMap);

export const rules = {
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
  'garou/import-no-duplicates': ['error', { considerQueryString: true }],
  'garou/import-first': 'warn',
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
