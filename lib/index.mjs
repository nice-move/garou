import { handleScript } from './handle-script/index.mjs';
import { handleStyle } from './handle-style/index.mjs';

import { handleHtml } from './handle-html.mjs';
import { findFiles } from './utils.mjs';

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

export default function action(pattern) {
  findFiles(pattern) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files);
      }

      console.log('No files matching the pattern were found');
    })
    .catch(console.error);
}
