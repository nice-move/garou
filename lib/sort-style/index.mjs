import stylelint from 'stylelint';

import rulesOrder from './rules-order.mjs';
import rulesOther from './rules-other.mjs';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const config = {
  plugins: ['stylelint-order'],
  rules: {
    ...rulesOrder,
    ...rulesOther,
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.scss'],
      extends: [require.resolve('./scss.cjs')],
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.md'],
      customSyntax: 'postcss-markdown',
    },
  ],
};

export function handleStyle(files) {
  return stylelint.lint({ files, fix: true, config });
}
