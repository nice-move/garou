/* eslint-disable no-await-in-loop */
import { readFile, writeFile } from 'fs/promises';

import { rehype } from 'rehype';
import sortAttributes from 'rehype-sort-attributes';

import { GarouError } from './utils.mjs';

export async function handleHtml(files) {
  const { process: processer } = rehype().use(sortAttributes);

  function transform(data) {
    return processer(data).then((io) => io.value);
  }

  for (const file of files) {
    try {
      const origin = await readFile(file, 'utf-8');
      const result = await transform(origin);
      if (result !== origin) {
        await writeFile(file, result);
      }
    } catch (error) {
      throw new GarouError(error.message, error.path);
    }
  }
}
