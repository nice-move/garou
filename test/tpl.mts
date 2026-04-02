import test from 'ava';

import { Test } from './helper/lib.mts';

test.serial('vue', Test, 'index.vue');

test.serial('md', Test, 'index.md');
