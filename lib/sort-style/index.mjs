import stylelint from 'stylelint';

import rulesOrder from './rules-order.mjs';
import rulesOther from './rules-other.mjs';

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
      plugins: ['stylelint-scss'],
      customSyntax: 'postcss-scss',
      rules: {
        'scss/double-slash-comment-empty-line-before': [
          'always',
          {
            except: ['first-nested'],
            ignore: ['between-comments', 'stylelint-commands'],
          },
        ],
        'scss/at-rule-conditional-no-parentheses': true,
        'scss/dollar-variable-empty-line-before': [
          'always',
          {
            except: ['after-dollar-variable', 'first-nested'],
            ignore: ['after-comment', 'inside-single-line-block'],
          },
        ],
        'scss/at-mixin-argumentless-call-parentheses': 'always',
        'scss/function-quote-no-quoted-strings-inside': true,
        'scss/function-unquote-no-unquoted-strings-inside': true,
      },
    },
    {
      files: ['**/*.html', '**/*.vue', '**/*.svg'],
      customSyntax: 'postcss-html',
    },
  ],
};

export function handleStyle(files) {
  return stylelint.lint({ files, fix: true, config });
}
