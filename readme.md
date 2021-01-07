# garou

Do thing what heroes didn't do.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/garou
[npm-badge]: https://img.shields.io/npm/v/garou.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/garou
[github-badge]: https://img.shields.io/npm/l/garou.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/garou.svg?style=flat-square&colorB=green&logo=node.js

## Features

A codebase refactor, take care what `eslint/stylelint/prettier` shouldn't care about. Offering better code changing when `git diff`.

- Sort `html/htm` attributes
- Sort `jsx` props
- Sort `js/mjs/cjs` class members
- Sort `js/mjs/cjs` import
- Sort `css/scss/less` properties
- Add empty line between code
- ...other fixing

## Installation

```bash
npm install garou --save-dev
```

## Usage

```bash
npx -c garou
```

## Configuration

```json
// example: package.json
{
  "garou": {
    "import-groups": [
      // see: https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
      ["^@internal\\/"],
      ["^@external\\/"]
    ]
  }
}
```
