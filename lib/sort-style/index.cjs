'use strict';

const { lint } = require('stylelint');

const config = {
  extends: [
    require.resolve('./stylelint-order.cjs'),
    require.resolve('./to-garou.cjs'),
  ],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.html', '**/*.vue', '**/*.svg'],
      customSyntax: 'postcss-html',
    },
  ],
};

module.exports = function sortStyle(files) {
  return lint({ files, fix: true, config });
};
