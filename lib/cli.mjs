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
  .command('$0 [pattern..]', '')
  .setup(({ pattern = [] }) => {
    action(pattern);
  });
