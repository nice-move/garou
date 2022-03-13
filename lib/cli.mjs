#!/usr/bin/env node

/* eslint-disable n/shebang */

import { Cheetor } from 'cheetor';

import { action } from './index.mjs';

/* globals __filename */
// eslint-disable-next-line unicorn/prefer-module
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
