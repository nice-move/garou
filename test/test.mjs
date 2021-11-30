import test from 'ava';

import { Test } from './helper/lib.mjs';

test('js', async (t) => {
  await Test(t, 'index.js');
});

test('jsx', async (t) => {
  await Test(t, 'index.jsx');
});

test('ts', async (t) => {
  await Test(t, 'index.ts');
});

test('tsx', async (t) => {
  await Test(t, 'index.tsx');
});

test('cjs', async (t) => {
  await Test(t, 'index.cjs');
});

test('mjs', async (t) => {
  await Test(t, 'index.mjs');
});

test('css', async (t) => {
  await Test(t, 'index.css');
});

test('less', async (t) => {
  await Test(t, 'index.less');
});

test('scss', async (t) => {
  await Test(t, 'index.scss');
});

test.serial('md', async (t) => {
  await Test(t, 'index.md');
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
