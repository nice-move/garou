/* eslint-disable no-param-reassign */
import micromatch from 'micromatch';
import { traverse } from 'object-traversal';
import sortAll from 'sort-keys';

import { orders, root } from './config.mjs';
import { sortBy, sortKeys } from './utils.mjs';

const patterns = Object.keys(orders).filter(
  (glob) => glob.includes('*') || glob.includes('{'),
);

function findPattern(nodePath) {
  return nodePath
    ? nodePath in orders
      ? nodePath
      : patterns.find((glob) => micromatch.isMatch(nodePath, glob))
    : undefined;
}

export function transform(data) {
  const { openapi } = data;

  if (typeof openapi !== 'string' || !/^3\.\d+\.\d+$/.test(openapi)) {
    return null;
  }

  const io = sortKeys(sortAll(data, { deep: true }), { keys: root });

  const temp = {};

  traverse(
    io,
    ({ parent, key, value, meta: { nodePath } }) => {
      const mark = nodePath
        ? nodePath.replaceAll('/', '※').replaceAll('☀', '/')
        : undefined;

      const path = findPattern(mark);

      if (path && orders[path]) {
        if (Array.isArray(value)) {
          if (
            value.length > 0 &&
            typeof orders[path] === 'string' &&
            orders[path]
          ) {
            temp[mark] = () => {
              parent[key] = sortBy(value, orders[path]);
            };
          }
        } else if (typeof value === 'object' && Object.keys(value).length > 0) {
          temp[mark] = () => {
            parent[key] = sortKeys(value, { keys: orders[path] });
          };
        }
      }
    },
    {
      pathSeparator: '☀',
    },
  );

  Object.keys(temp)
    .sort()
    .reverse()
    .forEach((mark) => {
      temp[mark]();
    });

  return io;
}
