// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { sortBy } from '../lib/handle-config/utils.mjs';

test('array of object sort by', (t) => {
  const array = [{ url: 'b' }, { url: 'a' }];

  const result = sortBy(array, 'url');

  t.snapshot(result);
});
