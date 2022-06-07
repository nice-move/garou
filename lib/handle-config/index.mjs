import { transform } from './transform.mjs';
import { read, write } from './utils.mjs';

export async function handleConfig(files) {
  for (const file of files) {
    const data = read(file);

    const result = transform(data);

    if (result) {
      write(file, result);
    }
  }
}
