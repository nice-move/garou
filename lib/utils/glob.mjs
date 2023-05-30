import { relative } from 'node:path';

import { globby } from 'globby13';
import { getPkg } from 'settingz/index.mjs';
import slash from 'slash';

function ignoreList() {
  const {
    'nice-move': { ignore: { all = [], garou: Ignore = [] } = {} } = {},
    garou: { ignore = [...all, ...Ignore] } = {},
  } = getPkg();

  return ignore;
}

const options = {
  dot: true,
  gitignore: true,
  ignore: [
    '**/*.min.*',
    '**/dist/',
    '**/.(cache|svn|git)/**',
    '**/.docusaurus/**',
    '**/miniprogram_npm/**',
    ...ignoreList(),
  ],
};

export function findFiles(patterns) {
  const cwd = process.cwd();

  const io = patterns.map((item) => slash(relative(cwd, item)));

  return globby(io, options);
}
