/* eslint-disable no-param-reassign */
import { traverse } from 'object-traversal';

import config from './config.yaml';
import { sortKeys } from './utils.mjs';

const { root, ...orders } = config;

const patterns = Object.keys(orders)
  .filter((key) => key.includes('*'))
  .map((key) => ({
    key,
    regex: new RegExp(`^${key.replaceAll('*', '\\w+')}$`),
  }));

function findPattern(nodePath) {
  return nodePath
    ? nodePath in orders
      ? nodePath
      : patterns.find(({ regex }) => regex.test(nodePath))?.key
    : undefined;
}

function callback({ parent, key, value, meta: { nodePath } }) {
  const path = findPattern(nodePath);

  if (orders[path]) {
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
