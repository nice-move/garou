import { readFileSync, writeFileSync } from 'fs';

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

export function sortBy(array, key) {
  return array.sort(({ [key]: a }, { [key]: b }) => {
    return a.localeCompare(b);
  });
}

export function sortKeys(object, { keys }) {
  const io = Object.entries(object);

  io.sort(
    keys.length === 0
      ? ([a], [b]) => a.localeCompare(b)
      : ([a], [b]) => {
          if (!keys.includes(a)) {
            return 1;
          }

          if (!keys.includes(b)) {
            return -1;
          }

          return keys.indexOf(a) - keys.indexOf(b);
        },
  );

  return Object.fromEntries(io);
}
