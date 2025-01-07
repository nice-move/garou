import consistentTypeSpecifierStyle from 'eslint-plugin-import/lib/rules/consistent-type-specifier-style.js';
import importNoDuplicates from 'eslint-plugin-import/lib/rules/no-duplicates.js';
import markdownProcessor from 'eslint-plugin-markdown/lib/processor.js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { plugin as react } from './react.mjs';
import { plugin as vue } from './vue.mjs';

export const pluginMap = {
  garou: {
    processors: {
      markdown: markdownProcessor,
    },
    rules: {
      'import-no-duplicates': importNoDuplicates,
      'consistent-type-specifier-style': consistentTypeSpecifierStyle,
      'sort-exports': simpleImportSort.rules.exports,
      // 'sort-imports': simpleImportSort.rules.imports,
    },
  },
  'garou-react': react,
  'garou-vue': vue,
};

export const rules = {
  'garou/sort-exports': 'warn',
  'garou/import-no-duplicates': ['error', { considerQueryString: true }],
};
