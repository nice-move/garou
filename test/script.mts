import test from 'ava';

import { Test } from './helper/lib.mts';

test.serial('js', Test, 'index.js');

test.serial('jsx', Test, 'index.jsx');

test.serial('ts', Test, 'index.ts');

test.serial('tsx', Test, 'index.tsx');

test.serial('cjs', Test, 'index.cjs');

test.serial('cts', Test, 'index.cts');

test.serial('mjs', Test, 'index.mjs');

test.serial('mts', Test, 'index.mts');
