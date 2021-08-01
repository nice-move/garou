import { ESLint } from 'eslint';

import { filenames, GarouError } from './utils.mjs';

const baseConfig = {
  overrides: [
    {
      files: filenames,
      plugins: ['jsonc'],
      parser: 'jsonc-eslint-parser',
      rules: {
        'jsonc/sort-keys': [
          'warn',
          {
            pathPattern: '.*',
            order: {
              type: 'asc',
              natural: true,
              caseSensitive: true,
            },
          },
        ],
      },
    },
  ],
};

export function handleJSON(files) {
  const eslint = new ESLint({
    allowInlineConfig: false,
    baseConfig,
    errorOnUnmatchedPattern: false,
    fix: true,
    useEslintrc: false,
  });

  return eslint.lintFiles(files).then((results) => {
    console.log(results);

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
