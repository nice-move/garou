import { extname } from 'path';

import globby from 'globby';
import slash from 'slash';

const templates = ['html', 'htm'];
const styles = ['vue', ...templates, 'css', 'scss', 'less'];
const scripts = ['vue', ...templates, 'ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs'];

function switchTypes(files) {
  const io = { style: [], script: [], template: [] };
  if (files.length > 0) {
    files.forEach((file) => {
      const ext = extname(file).replace(/^\./, '');
      if (styles.includes(ext)) {
        io.style.push(file);
      }
      if (scripts.includes(ext)) {
        io.script.push(file);
      }
      if (templates.includes(ext)) {
        io.template.push(file);
      }
    });
  }
  return io;
}

const options = {
  dot: true,
  gitignore: true,
  ignore: ['**/.gitkeep', '**/*.min.*', '**/dist/', '**/.(cache|svn|git)/**'],
};

export function findFiles(patterns, isGlobs = false) {
  const io = patterns.map((item) => slash(item));
  return (isGlobs ? globby(io, options) : Promise.resolve(io)).then(
    switchTypes,
  );
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
