// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { fs } from 'fs-chain';

import { Test } from './helper/lib.mjs';

fs.remove('dist/api.js');

test.serial('yarn-lockfile', Test, 'yarn.lock');

test.serial('oas-json', Test, 'oas.json');

test.serial('oas-yaml', Test, 'oas.yaml');

test.serial('js', Test, 'index.js');

test.serial('jsx', Test, 'index.jsx');

test.serial('ts', Test, 'index.ts');

test.serial('tsx', Test, 'index.tsx');

test.serial('cjs', Test, 'index.cjs');

test.serial('cts', Test, 'index.cts');

test.serial('mjs', Test, 'index.mjs');

test.serial('mts', Test, 'index.mts');

test.serial('css', Test, 'index.css');

test.serial('less', Test, 'index.less');

test.serial('scss', Test, 'index.scss');

test.serial('html', Test, 'index.html');

test.serial('htm', Test, 'index.htm');

test.serial('vue', Test, 'index.vue');

test.serial('md', Test, 'index.md');
