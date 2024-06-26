import html from 'postcss-html';
import less from 'postcss-less';
import markdown from 'postcss-markdown';
import * as syntax from 'postcss-scss';
import stylelint from 'stylelint';

import { GarouError } from '../utils/fs.mjs';

import { pluginOther, ruleOther, vendors } from './other.mjs';
import { pluginScss, ruleScss } from './scss.mjs';

function mapValues(object) {
  return Object.fromEntries(Object.keys(object).map((key) => [key, null]));
}

const config = {
  reportNeedlessDisables: false,
  reportInvalidScopeDisables: false,
  pluginFunctions: {
    ...pluginScss,
    ...pluginOther,
  },
  rules: {
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
  return stylelint
    .lint({
      allowEmptyInput: true,
      config,
      files,
      fix: true,
      defaultSeverity: 'warning',
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
    });
}
