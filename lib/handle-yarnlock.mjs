import lockfile from '@yarnpkg/lockfile';
import { fixDuplicates } from 'yarn-deduplicate/index.js';

import { readThenWrite } from './utils/fs.mjs';

const { parse, stringify } = lockfile;

const parseYarnLock = (file) => parse(file).object;

function removeCache(url) {
  const io = new URL(url);

  if (
    io.search &&
    (io.searchParams.has('other_urls') ||
      (io.searchParams.has('cache') && io.searchParams.has('sync_timestamp')))
  ) {
    io.searchParams.delete('other_urls');
    io.searchParams.delete('cache');
    io.searchParams.delete('sync_timestamp');

    return io.toString();
  }

  return url;
}

function transform(data) {
  if (!data.includes('# yarn lockfile v1')) {
    return data;
  }

  const io = fixDuplicates(data);

  const json = parseYarnLock(io);

  Object.values(json).forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.resolved = removeCache(item.resolved);
  });

  return stringify(json);
}

export async function handleYarnLock(files) {
  for (const file of files) {
    await readThenWrite(file, transform);
  }
}
