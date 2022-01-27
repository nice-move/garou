import { rehype } from 'rehype';
import sortAttributes from 'rehype-sort-attributes';

import { readThenWrite } from './utils/fs.mjs';

export async function handleHtml(files) {
  const { process: processer } = rehype().use(sortAttributes);

  function transform(data) {
    return processer(data).then((io) => io.value);
  }

  for (const file of files) {
    await readThenWrite(file, transform);
  }
}
