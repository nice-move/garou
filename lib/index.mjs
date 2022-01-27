import { handleScript } from './handle-script/index.mjs';
import { handleStyle } from './handle-style/index.mjs';
import { classify } from './utils/classify.mjs';
import { findFiles } from './utils/glob.mjs';

import { handleHtml } from './handle-html.mjs';

async function runSorter({ style, script, html }) {
  if (style.length > 0) {
    await handleStyle(style);
  }

  if (script.length > 0) {
    await handleScript(script);
  }

  if (html.length > 0) {
    await handleHtml(html);
  }
}

export function action(patterns) {
  findFiles(patterns)
    .then(classify) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files);
      }

      console.log('No files matching the pattern were found');
    })
    .catch(console.error);
}
