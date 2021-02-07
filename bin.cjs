#!/usr/bin/env node

const Cheetor = require('cheetor');

const action = require('./index.cjs');

new Cheetor()
  .effect(({ scriptName }) => {
    process.title = scriptName;
  })
  .setup((args) => {
    action(args._[0], true);
  });
