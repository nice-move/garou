import { rehype } from 'rehype';
import sortAttributes from 'rehype-sort-attributes';

import { readThenWrite } from './utils/fs.mjs';

export async function handleHtml(files) {
  const { process: processor } = rehype().use(sortAttributes);

  function transform(data) {
    return processor(data).then((io) => io.value);
  }

  for (const file of files) {
    await readThenWrite(file, transform);
  }
}
