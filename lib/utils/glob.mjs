import { relative, resolve } from 'node:path';

import { globby } from 'globby';
import parse from 'parse-gitignore';
import { getPkg } from 'settingz/index.mjs';
import slash from 'slash';

function readIgnore(cwd) {
  try {
    return parse.file(resolve(cwd, '.prettierignore')).patterns;
  } catch {
    return [];
  }
}

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
          '**/pnpm-lock.yaml',
          '**/pnpm-workspace.yaml',
          ...ignoreList(),
          ...readIgnore(cwd),
        ]
      : undefined,
  });
}
