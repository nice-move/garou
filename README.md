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

A codebase refactor, take care what `eslint/stylelint/prettier` shouldn't care about. Offering better code comparing when `git diff`.

- Sort `html/htm` attributes
- Sort `jsx/tsx` props
- Sort `vue` component properties / attributes
- Handle `jsx/vue` self closing
- Sort `tsx/ts/jsx/js/mjs/cjs` class members
- Sort `tsx/ts/jsx/js/mjs/cjs` import
- Sort `css/scss/less` properties
- Add space to javascript comments
- Handle empty line between code
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
    ]
  }
}
```

## Tips

### Using `garou` with `lint-staged`

```json
// package.json
{
  "lint-staged": {
    "*": ["garou", "prettier", "eslint --fix"]
  }
}
```

Using `garou` might mess up your format, I suggest run `garou` before run `prettier`.

Read more at the [lint-staged](https://github.com/okonet/lint-staged#configuration) repo.
