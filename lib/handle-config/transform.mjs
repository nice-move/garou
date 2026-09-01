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
  if (!nodePath) {
    return undefined;
  }

  if (Object.hasOwn(orders, nodePath)) {
    return nodePath;
  }

  return patterns.find((glob) => micromatch.isMatch(nodePath, glob));
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
      const pathOrders =
        path && Object.hasOwn(orders, path) ? orders[path] : undefined;

      if (pathOrders) {
        if (Array.isArray(value)) {
          if (typeof pathOrders === 'string' && value.length > 0) {
            temp[mark] = () => {
              parent[key] = sortBy(value, pathOrders);
            };
          }
        } else if (typeof value === 'object' && Object.keys(value).length > 0) {
          temp[mark] = () => {
            parent[key] = sortKeys(value, { keys: pathOrders });
          };
        }
      }
    },
    {
      pathSeparator: '☀',
    },
  );

  Object.keys(temp)
    .toSorted((left, right) => right.localeCompare(left))
    .forEach((mark) => {
      temp[mark]();
    });

  return io;
}
