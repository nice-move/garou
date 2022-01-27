import { globby } from 'globby13';
import { getPkg } from 'settingz';
import slash from 'slash';

function ignoreList() {
  const {
    'nice-move': { ignore: { all = [], ignore: Ignore = [] } = {} } = {},
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
    '**/miniprogram_npm/**',
    ...ignoreList(),
  ],
};

export function findFiles(patterns) {
  const io = patterns.map((item) => slash(item));

  return globby(io, options);
}
