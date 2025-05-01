import base from '@nice-move/all-in-base';

export default [
  ...base,
  {
    files: ['lib/cli.mjs'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
