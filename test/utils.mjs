import test from 'ava';

import { sortBy } from '../lib/handle-config/utils.mjs';
import { parseImportGroups } from '../lib/utils/lib.mjs';

test('array of object sort by', (t) => {
  const array = [{ url: 'b' }, { url: 'a' }];

  const result = sortBy(array, 'url');

  t.snapshot(result);
});

function marco(t, ...inputs) {
  for (const input of inputs) {
    t.snapshot(parseImportGroups(input));
  }
}

test(
  'parse import groups',
  marco,
  'react',
  ['react', 'react-dom'],
  ['abc', ['react', 'react-dom'], []],
  [[], [''], '', 9],
  'nice-move-preset',
  ['nice-move-preset'],
  ['nice-move-preset', 'abc'],
  ['abc', ['nice-move-preset'], ['efg']],
);
