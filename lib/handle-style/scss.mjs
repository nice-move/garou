import s0 from 'stylelint-scss/dist/rules/at-mixin-argumentless-call-parentheses/index.js';
import s1 from 'stylelint-scss/dist/rules/at-rule-conditional-no-parentheses/index.js';
import s2 from 'stylelint-scss/dist/rules/dollar-variable-empty-line-before/index.js';
import s3 from 'stylelint-scss/dist/rules/double-slash-comment-empty-line-before/index.js';

export const pluginScss = {
  // @ts-ignore
  'scss/at-mixin-argumentless-call-parentheses': s0.default || s0,
  // @ts-ignore
  'scss/at-rule-conditional-no-parentheses': s1.default || s1,
  // @ts-ignore
  'scss/dollar-variable-empty-line-before': s2.default || s2,
  // @ts-ignore
  'scss/double-slash-comment-empty-line-before': s3.default || s3,
  // @ts-ignore
};
export const ruleScss = {
  'scss/at-mixin-argumentless-call-parentheses': 'always',
  'scss/at-rule-conditional-no-parentheses': true,
  'scss/dollar-variable-empty-line-before': [
    'always',
    {
      except: ['after-dollar-variable', 'first-nested'],
      ignore: ['after-comment', 'inside-single-line-block'],
    },
  ],
  'scss/double-slash-comment-empty-line-before': [
    'always',
    {
      except: ['first-nested'],
      ignore: ['between-comments', 'stylelint-commands'],
    },
  ],
};
