const globby = require('globby');
const { extname } = require('path');

const options = {
  baseNameMatch: true,
  dot: true,
  gitignore: true,
};

const styles = ['vue', 'html', 'htm', 'svg', 'css', 'scss', 'less'];
const scripts = ['vue', 'html', 'htm', 'js', 'jsx', 'mjs', 'cjs'];
const templates = ['vue', 'html', 'htm', 'svg'];

function findFiles(
  pattern = '*.{js,mjs,cjs,jsx,vue,html,htm,svg,css,scss,less}',
) {
  return globby(pattern, options).then((files) => {
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
  });
}

module.exports = { findFiles };
