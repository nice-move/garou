import { relative } from 'node:path';

import { globby } from 'globby';
import { getPkg } from 'settingz/index.mjs';
import slash from 'slash';

function ignoreList() {
  const {
    'nice-move': { ignore: { all = [], garou: Ignore = [] } = {} } = {},
    garou: { ignore = [...all, ...Ignore] } = {},
  } = getPkg();

  return ignore;
}

export function findFiles(patterns, ignore = true) {
  const cwd = process.cwd();

  const io = patterns.map((item) => slash(relative(cwd, item)));

  return globby(io, {
    dot: true,
    gitignore: ignore,
    ignore: ignore
      ? [
          '**/*.min.*',
          '**/dist/',
          '**/.(cache|svn|git)/**',
          '**/.(docusaurus|obsidian)/**',
          '**/miniprogram_npm/**',
          '**/node_modules/**',
          ...ignoreList(),
        ]
      : undefined,
  });
}
