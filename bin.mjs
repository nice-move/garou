#!/usr/bin/env node

import { Cheetor } from 'cheetor';

import action from './index.mjs';

new Cheetor('../package.json', import.meta.url)
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  .setup((args) => {
    action(args._, true);
  });
