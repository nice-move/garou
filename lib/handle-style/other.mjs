import mediaAfter from '@stylistic/stylelint-plugin/lib/rules/media-feature-range-operator-space-after/index.js';
import mediaBefore from '@stylistic/stylelint-plugin/lib/rules/media-feature-range-operator-space-before/index.js';

export const vendors = {
  'at-rule-no-vendor-prefix': true,
  'media-feature-name-no-vendor-prefix': true,
  'property-no-vendor-prefix': true,
  'selector-no-vendor-prefix': true,
  'value-no-vendor-prefix': true,
};

export const pluginOther = {
  '@stylistic/media-feature-range-operator-space-after': mediaAfter,
  '@stylistic/media-feature-range-operator-space-before': mediaBefore,
};

export const ruleOther = {
  ...vendors,
  'alpha-value-notation': 'number',
  'at-rule-empty-line-before': [
    'always',
    {
      except: ['blockless-after-same-name-blockless', 'first-nested'],
      ignore: ['after-comment'],
      ignoreAtRules: ['else'],
    },
  ],
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
  'length-zero-no-unit': [true, { ignore: ['custom-properties'] }],
  '@stylistic/media-feature-range-operator-space-after': 'always',
  '@stylistic/media-feature-range-operator-space-before': 'always',
  'rule-empty-line-before': [
    'always',
    {
      except: ['first-nested'],
      ignore: ['after-comment'],
    },
  ],
  'selector-pseudo-element-colon-notation': 'double',
  'selector-type-case': 'lower',
  'value-keyword-case': [
    'lower',
    { ignoreFunctions: ['v-bind'], camelCaseSvgKeywords: true },
  ],
};
