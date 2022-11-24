import { extname } from 'node:path';

export const config = ['json', 'yml', 'yaml'];

const htmls = ['html', 'htm'];
const styles = ['vue', 'svg', 'md', ...htmls, 'css', 'scss', 'less'];
const scripts = [
  'vue',
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

export function classify(files) {
  const io = {
    style: [],
    script: [],
    html: [],
    config: [],
    yarnLockFile: [],
  };

  if (files.length > 0) {
    files.forEach((file) => {
      if (file === 'yarn.lock' || file.endsWith('/yarn.lock')) {
        io.yarnLockFile.push(file);
      }

      const ext = extname(file).replace(/^\./, '');

      if (config.includes(ext)) {
        io.config.push(file);
      }

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
