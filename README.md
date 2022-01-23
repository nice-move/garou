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

A code refactoring tool, fixing what `eslint/stylelint` shouldn't care about, what `prettier` didn't care about. Offering better code comparing for `git diff`.

- Handle `tsx/jsx/vue` self closing
- Handle text case from `css/scss/less`
- Remove vendor prefix from `css/scss/less`
- Handle whitespace, empty line between code
- Sort `css/scss/less` properties
- Sort `html/htm` attributes
- Sort `jsx/tsx` props
- Sort `tsx/ts/mts/cts/jsx/js/mjs/cjs` class members
- Sort `tsx/ts/mts/cts/jsx/js/mjs/cjs` import / export
- Sort `vue` component properties / attributes
- ...other fixing

## Installation

```sh
npm install garou --save-dev
```

## Usage

```sh
npx --no-install garou .
npx --no-install garou src
npx --no-install garou **/foo.js
```

### Run without installation

```sh
npx garou .
```

## Configuration

```jsonc
// example: package.json
{
  "garou": {
    "import-groups": [
      // see: https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
      ["react", "react-dom"],
      // shorthand for ["^@external\\/"]
      "^@external\\/",
      "lodash"
    ],
    "ignore": ["fixture/**"]
  }
}
```

## Tips

### Using `garou` with `lint-staged`

```jsonc
// package.json
{
  "lint-staged": {
    "*": ["garou", "prettier", "eslint --fix"]
  }
}
```

Using `garou` might mess up your format, I suggest run `garou` before run `prettier`.

Read more at the [lint-staged](https://github.com/okonet/lint-staged#configuration) repo.

## Inspiration

This project is inspired by [sortier](https://snowcoders.github.io/sortier/).

## Related

- [nice-move](https://github.com/nice-move/nice-move)
