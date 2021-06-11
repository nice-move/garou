#!/usr/bin/env node

const { Cheetor } = require('cheetor');

const action = require('./index.cjs');

new Cheetor('./package.json', __dirname)
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  .setup((args) => {
    action(args._, true);
  });
