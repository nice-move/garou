'use strict';

module.exports = {
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
        severity: 'warning',
      },
    ],
    'color-hex-length': [
      'long',
      {
        severity: 'warning',
      },
    ],
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'comment-whitespace-inside': [
      'always',
      {
        severity: 'warning',
      },
    ],
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
    'media-feature-range-operator-space-after': [
      'always',
      {
        severity: 'warning',
      },
    ],
    'media-feature-range-operator-space-before': [
      'always',
      {
        severity: 'warning',
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
        severity: 'warning',
      },
    ],
    'selector-pseudo-element-colon-notation': [
      'double',
      {
        severity: 'warning',
      },
    ],
    'shorthand-property-no-redundant-values': true,
  },
};
