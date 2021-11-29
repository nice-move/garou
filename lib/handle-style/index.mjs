import html from 'postcss-html';
import less from 'postcss-less';
import markdown from 'postcss-markdown';
import lint from 'stylelint/lib/standalone.js';

import { scss } from './scss/index.mjs';

import { pluginOrder, rulesOrder } from './order.mjs';
import { rulesOther } from './other.mjs';

const config = {
  pluginFunctions: pluginOrder,
  rules: {
    ...rulesOrder,
    ...rulesOther,
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: less,
    },
    {
      files: ['**/*.scss'],
      ...scss,
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: html(),
    },
    {
      files: ['**/*.md'],
      customSyntax: markdown(),
    },
  ],
};

export function handleStyle(files) {
  return lint({
    allowEmptyInput: true,
    config,
    files,
    fix: true,
  });
}
