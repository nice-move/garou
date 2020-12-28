const { findFiles } = require('./lib/utils.cjs');

const sortStyle = require('./lib/sort-style.cjs');
const sortScript = require('./lib/sort-script.cjs');
const sortTemplate = require('./lib/sort-template.cjs');

async function runSorter({ style, script, template }) {
  if (style.length > 0) {
    await sortStyle(style);
  }
  if (script.length > 0) {
    await sortScript(script);
  }
  if (template.length > 0) {
    await sortTemplate(template);
  }
}

module.exports = function action(pattern) {
  findFiles(pattern) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files);
      }
      console.log('No files matching the pattern were found');
    })
    .catch((error) => {
      console.error(error);
    });
};
