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
      : patterns.find((glob) => micromatch.isMatch(nodePath, glob))
    : undefined;
}

export function transform(data) {
  const { openapi } = data;

  if (typeof openapi !== 'string' || !/^3\.\d+\.\d+$/.test(openapi)) {
    return null;
  }

  const io = sortKeys(data, { keys: root });

  const temp = {};

  traverse(
    io,
    ({ parent, key, value, meta: { nodePath } }) => {
      const mark = nodePath
        ? nodePath.replaceAll('/', '※').replaceAll('☀', '/')
        : undefined;

      const path = findPattern(mark);

      if (path && orders[path] && typeof value === 'object') {
        temp[mark] = () => {
          parent[key] = sortKeys(value, { keys: orders[path] });
        };
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
      console.log(mark);
      temp[mark]();
    });

  return io;
}
