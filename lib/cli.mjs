#!/usr/bin/env node --trace-warnings
import { Cheetor } from 'cheetor';

new Cheetor('../package.json', import.meta.url)
  .config((cli) => {
    cli
      .usage('Usage: $0 .')
      .usage('Usage: $0 src')
      .usage('Usage: $0 **/foo.js');

    return cli;
  })
  .command('$0 [pattern..]', '', {
    ignore: {
      type: 'boolean',
      default: true,
      description: 'enable default ignore presets',
    },
  })
  .setup(({ pattern = [], ignore }) => {
    import('./index.mjs')
      .then(({ action }) => {
        action(pattern, ignore);
      })
      .catch((error) => {
        console.error(error);

        process.exitCode = 1;
      });
  });
