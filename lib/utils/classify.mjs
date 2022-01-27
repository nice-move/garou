import { extname } from 'path';

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

export function classify(files) {
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
