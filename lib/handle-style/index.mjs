import html from 'postcss-html';
import less from 'postcss-less';
import markdown from 'postcss-markdown';
import * as syntax from 'postcss-scss';
import lint from 'stylelint/lib/standalone.js';

import { GarouError } from '../utils.mjs';

import { scss } from './scss/index.mjs';

import { pluginOrder, rulesOrder } from './order.mjs';
import { rulesOther } from './other.mjs';

const config = {
  reportNeedlessDisables: false,
  reportInvalidScopeDisables: false,
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
      customSyntax: syntax,
      ...scss,
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: html(),
      ...scss,
    },
    {
      files: ['**/*.md'],
      customSyntax: markdown(),
      ...scss,
    },
  ],
};

export function handleStyle(files) {
  return lint({
    allowEmptyInput: true,
    config,
    files,
    fix: true,
  })
    .then(({ errored, results }) => {
      if (errored) {
        const io = results.find((item) => item.errored);
        if (io) {
          throw new GarouError(
            io.warnings.find((item) => item.severity === 'error').text,
            io.source,
          );
        } else {
          console.warn(results[0]);
        }
      }
    })
    .catch(console.error);
}
