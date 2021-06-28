'use strict';

const { lint } = require('stylelint');

const config = {
  extends: [
    require.resolve('./stylelint-order.cjs'),
    require.resolve('./to-garou.cjs'),
  ],
};

module.exports = function sortStyle(files) {
  return lint({ files, fix: true, config });
};
