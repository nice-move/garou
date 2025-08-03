import base from '@nice-move/all-in-web/eslint';

export default [
  ...base,
  {
    files: ['lib/cli.mjs'],
    rules: {
      'n/hashbang': 'off',
    },
  },
];
