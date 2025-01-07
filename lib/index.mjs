import { haveLocalDependencies } from 'settingz/index.mjs';

import { classify } from './utils/classify.mjs';
import { findFiles } from './utils/glob.mjs';

async function runSorter({ style, script, html, config, yarnLockFile }) {
  if (yarnLockFile.length > 0) {
    const { handleYarnLock } = await import('./handle-yarnlock.mjs');
    await handleYarnLock(yarnLockFile);
  }

  if (html.length > 0) {
    const { handleHtml } = await import('./handle-html.mjs');
    await handleHtml(html);
  }

  if (style.length > 0 && haveLocalDependencies('stylelint')) {
    const { handleStyle } = await import('./handle-style/index.mjs');
    await handleStyle(style);
  }

  if (script.length > 0 && haveLocalDependencies('eslint')) {
    const { handleScript } = await import('./handle-script/index.mjs');
    await handleScript(script);
  }

  if (config.length > 0) {
    const { handleConfig } = await import('./handle-config/index.mjs');
    await handleConfig(config);
  }
}

export function action(patterns, ignore = true) {
  findFiles(patterns, ignore)
    .then(classify) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files).catch(console.error);
      }

      console.log('No files matching the pattern were found');
    })
    .catch(console.error);
}
