import { readFileSync, writeFileSync } from 'fs';

import sortBy from 'sort-keys';
import YAML from 'yaml';

export function read(path) {
  const raw = readFileSync(path, 'utf8');

  return /\.json$/.test(path) ? JSON.parse(raw) : YAML.parse(raw);
}

export function write(path, data) {
  const raw = /\.json$/.test(path)
    ? JSON.stringify(data, null, 2)
    : YAML.stringify(data);

  writeFileSync(path, raw);
}

export function sortKeys(data, { keys, deep = false }) {
  return sortBy(data, {
    deep,
    compare: keys
      ? (next, prev) => {
          const P = keys.indexOf(prev);
          const N = keys.indexOf(next);

          return P === -1 && N === -1
            ? 0
            : P === -1
            ? -1
            : N === -1
            ? 1
            : N < P
            ? -1
            : 1;
        }
      : undefined,
  });
}
