import { readFile, writeFile } from 'fs/promises';

export class GarouError extends Error {
  constructor(message, filePath) {
    super(message);
    this.name = 'GarouError';

    if (filePath) {
      this.filePath = filePath;
    }
  }
}

export async function readThenWrite(file, transform) {
  try {
    const origin = await readFile(file, 'utf8');
    const result = await transform(origin);

    if (result && result !== origin) {
      await writeFile(file, result);
    }
  } catch (error) {
    throw new GarouError(error.message, error.path);
  }
}
