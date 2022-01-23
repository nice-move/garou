import { extname } from 'path';

import { globby } from 'globby12';
import { getPkg } from 'settingz';
import slash from 'slash';

export const jsonc = [
  '.vscode/extensions.json',
  '.vscode/launch.json',
  '.vscode/settings.json',
  'jsconfig.json',
  'tsconfig.json',
];

export const json = ['project.config.json', 'project.private.config.json'];

const htmls = ['html', 'htm'];
const styles = ['vue', 'svg', 'md', ...htmls, 'css', 'scss', 'less'];
const scripts = [
  'vue',
  'svg',
  'md',
  ...htmls,
  'ts',
  'mts',
  'cts',
  'tsx',
  'js',
  'jsx',
  'mjs',
  'cjs',
];

function switchTypes(files) {
  const io = {
    style: [],
    script: [],
    html: [],
    json: [],
    jsonc: [],
  };

  if (files.length > 0) {
    files.forEach((file) => {
      if (json.some((name) => file.endsWith(name))) {
        io.json.push(file);
      }

      if (jsonc.some((name) => file.endsWith(name))) {
        io.jsonc.push(file);
      }

      const ext = extname(file).replace(/^\./, '');

      if (styles.includes(ext)) {
        io.style.push(file);
      }

      if (scripts.includes(ext)) {
        io.script.push(file);
      }

      if (htmls.includes(ext)) {
        io.html.push(file);
      }
    });
  }

  return io;
}

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

  return globby(io, options).then(switchTypes);
}

export class GarouError extends Error {
  constructor(message, filePath) {
    super(message);
    this.name = 'GarouError';

    if (filePath) {
      this.filePath = filePath;
    }
  }
}
