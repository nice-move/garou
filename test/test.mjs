import test from 'ava';

import { Test } from './helper/lib.mjs';

test.serial('js', async (t) => {
  await Test(t, 'index.js');
});

test.serial('jsx', async (t) => {
  await Test(t, 'index.jsx');
});

test.serial('ts', async (t) => {
  await Test(t, 'index.ts');
});

test.serial('tsx', async (t) => {
  await Test(t, 'index.tsx');
});

test.serial('cjs', async (t) => {
  await Test(t, 'index.cjs');
});

test.serial('cts', async (t) => {
  await Test(t, 'index.cts');
});

test.serial('mjs', async (t) => {
  await Test(t, 'index.mjs');
});

test.serial('mts', async (t) => {
  await Test(t, 'index.mts');
});

test.serial('css', async (t) => {
  await Test(t, 'index.css');
});

test.serial('less', async (t) => {
  await Test(t, 'index.less');
});

test.serial('scss', async (t) => {
  await Test(t, 'index.scss');
});

test.serial('html', async (t) => {
  await Test(t, 'index.html');
});

test.serial('htm', async (t) => {
  await Test(t, 'index.htm');
});

test.serial('vue', async (t) => {
  await Test(t, 'index.vue');
});

test.serial('md', async (t) => {
  await Test(t, 'index.md');
});
