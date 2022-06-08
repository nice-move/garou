/* eslint-disable no-param-reassign */
import micromatch from 'micromatch';
import { traverse } from 'object-traversal';

import { orders, root } from './config.js';
import { sortKeys } from './utils.mjs';

const patterns = Object.keys(orders).filter((glob) => glob.includes('*'));

function findPattern(nodePath) {
  return nodePath
    ? nodePath in orders
      ? nodePath
      : patterns.find((glob) => {
          return micromatch.isMatch(nodePath, glob);
        })
    : undefined;
}

function callback({ parent, key, value, meta: { nodePath } }) {
  const path = findPattern(nodePath);

  if (path && orders[path] && typeof value === 'object') {
    parent[key] = sortKeys(value, { keys: orders[path] });
  }
}

export function transform(data) {
  const { openapi } = data;

  if (typeof openapi !== 'string' || !/^3\.\d+\.\d+$/.test(openapi)) {
    return null;
  }

  const io = sortKeys(sortKeys(data, { deep: true }), { keys: root });

  traverse(io, callback, { pathSeparator: '/' });

  return io;
}
