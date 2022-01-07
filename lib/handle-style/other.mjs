export const vendors = {
  'at-rule-no-vendor-prefix': true,
  'media-feature-name-no-vendor-prefix': true,
  'property-no-vendor-prefix': true,
  'selector-no-vendor-prefix': true,
  'value-no-vendor-prefix': true,
};

export const ruleOther = {
  ...vendors,
  'alpha-value-notation': [
    'percentage',
    {
      exceptProperties: ['opacity'],
    },
  ],
  'at-rule-empty-line-before': [
    'always',
    {
      except: ['blockless-after-same-name-blockless', 'first-nested'],
      ignore: ['after-comment'],
      ignoreAtRules: ['else'],
    },
  ],
  'color-function-notation': 'legacy',
  'color-hex-length': 'long',
  'comment-empty-line-before': [
    'always',
    {
      except: ['first-nested'],
      ignore: ['stylelint-commands'],
    },
  ],
  'comment-whitespace-inside': 'always',
  'custom-property-empty-line-before': [
    'always',
    {
      except: ['after-custom-property', 'first-nested'],
      ignore: ['after-comment', 'inside-single-line-block'],
    },
  ],
  'declaration-empty-line-before': [
    'always',
    {
      except: ['after-declaration', 'first-nested'],
      ignore: ['after-comment', 'inside-single-line-block'],
    },
  ],
  'function-calc-no-unspaced-operator': true,
  'function-name-case': 'lower',
  'hue-degree-notation': 'angle',
  'length-zero-no-unit': true,
  'media-feature-range-operator-space-after': 'always',
  'media-feature-range-operator-space-before': 'always',
  'rule-empty-line-before': [
    'always',
    {
      except: ['first-nested'],
      ignore: ['after-comment'],
    },
  ],
  'selector-pseudo-element-colon-notation': 'double',
  'selector-type-case': 'lower',
  'value-keyword-case': 'lower',
};
