import html from 'postcss-html';
import less from 'postcss-less';
import markdown from 'postcss-markdown';
import * as syntax from 'postcss-scss';
import lint from 'stylelint/lib/standalone.js';

import { GarouError } from '../utils/fs.mjs';

import { pluginOrder, ruleOrder } from './order.mjs';
import { ruleOther, vendors } from './other.mjs';
import { pluginScss, ruleScss } from './scss.mjs';

function mapValues(object) {
  return Object.fromEntries(Object.keys(object).map((key) => [key, null]));
}

const config = {
  reportNeedlessDisables: false,
  reportInvalidScopeDisables: false,
  pluginFunctions: {
    ...pluginOrder,
    ...pluginScss,
  },
  rules: {
    ...ruleOrder,
    ...ruleOther,
  },
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: less,
    },
    {
      files: ['**/*.scss'],
      customSyntax: syntax,
      rules: ruleScss,
    },
    {
      files: ['**/*.{html,htm,svg,vue}'],
      customSyntax: html(),
      rules: ruleScss,
    },
    {
      files: ['**/*.{html,htm,svg}'],
      rules: mapValues(vendors),
    },
    {
      files: ['**/*.md'],
      customSyntax: markdown(),
      rules: ruleScss,
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
