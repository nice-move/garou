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
  const pkg = getPkg();
  const niceMove = pkg['nice-move'] ?? {};
  const niceMoveIgnore = niceMove.ignore ?? {};
  const all = niceMoveIgnore.all ?? [];
  const garouIgnore = niceMoveIgnore.garou ?? [];
  const garou = pkg.garou ?? {};
  const ignore = garou.ignore ?? [...all, ...garouIgnore];

  return ignore;
}

export function findFiles(patterns, isIgnored = true) {
  const cwd = process.cwd();

  const io = patterns.map((item) => slash(relative(cwd, item)));

  return globby(io, {
    dot: true,
    gitignore: isIgnored,
    ignore: isIgnored
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
