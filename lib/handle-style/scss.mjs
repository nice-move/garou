export const ruleScss = {
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
