import { Cheetor } from 'cheetor';

import { action } from './index.mjs';

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
    action(pattern, ignore);
  });
