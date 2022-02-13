#!/usr/bin/env node

/* eslint-disable n/shebang */

'use strict';

const { Cheetor } = require('cheetor');
const { action } = require('./index.mjs');

new Cheetor('../package.json', __filename)
  .config((cli) => {
    cli
      .usage('Usage: $0 .')
      .usage('Usage: $0 src')
      .usage('Usage: $0 **/foo.js');

    return cli;
  })
  .command('$0 [pattern..]', '')
  .setup(({ pattern = [] }) => {
    action(pattern);
  });
