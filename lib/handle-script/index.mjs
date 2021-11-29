import { ESLint } from 'eslint';

import { GarouError } from '../utils.mjs';

import { options } from './options.mjs';

export function handleScript(files) {
  const eslint = new ESLint(options);

  return eslint.lintFiles(files).then((results) => {
    const error = results.find(({ messages }) =>
      messages.find(({ fatal }) => fatal),
    );

    if (error) {
      throw new GarouError(
        error.messages.find(({ fatal }) => fatal).message,
        error.filePath,
      );
    }

    return ESLint.outputFixes(results);
  });
}
