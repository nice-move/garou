'use strict';

module.exports = {
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
};
