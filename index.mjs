import { sortScript } from './lib/sort-script.mjs';
import sortStyle from './lib/sort-style/index.cjs';
import { sortTemplate } from './lib/sort-template.mjs';
import { findFiles } from './lib/utils.mjs';

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

export default function action(pattern, isGlobs) {
  findFiles(pattern, isGlobs) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files);
      }
      console.log('No files matching the pattern were found');
    })
    .catch(console.error);
}
