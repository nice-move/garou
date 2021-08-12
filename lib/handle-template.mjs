import { Text } from 'fs-chain';
import { rehype } from 'rehype';
import sortAttributes from 'rehype-sort-attributes';

import { GarouError } from './utils.mjs';

export async function handleTemplate(files) {
  const { process: processer } = rehype().use(sortAttributes);

  async function transform(data) {
    return (await processer(data)).value;
  }

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    await new Text()
      .source(file)
      .onDone(transform)
      .output()
      .catch((error) => {
        throw new GarouError(error.message, error.path);
      });
  }
}
