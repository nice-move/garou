import test from 'ava';

import { Test } from './helper/lib.mjs';

test.serial('yarn-lockfile', Test, 'yarn.lock');

test.serial('oas-json', Test, 'oas.json');

test.serial('oas-yaml', Test, 'oas.yaml');

test.serial('css', Test, 'index.css');

test.serial('less', Test, 'index.less');

test.serial('scss', Test, 'index.scss');

test.serial('html', Test, 'index.html');

test.serial('htm', Test, 'index.htm');

test.serial('vue', Test, 'index.vue');

test.serial('md', Test, 'index.md');
