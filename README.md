# garou

Do thing what heroes didn't do.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnice-move%2Fgarou.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnice-move%2Fgarou?ref=badge_shield)

[npm-url]: https://www.npmjs.com/package/garou
[npm-badge]: https://img.shields.io/npm/v/garou.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/garou
[github-badge]: https://img.shields.io/npm/l/garou.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/garou.svg?style=flat-square&colorB=green&logo=node.js

## Features

A codebase refactor, take care what `eslint/stylelint/prettier` shouldn't care about. Offering better code comparing when `git diff`.

- Sort `html/htm` attributes
- Sort `jsx` props
- Sort `vue` component properties / attributes
- Handle `jsx/vue` self closing
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

```jsonc
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

## Tips

`garou` might mess up your format, I suggest run `garou` before run `prettier`.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnice-move%2Fgarou.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnice-move%2Fgarou?ref=badge_large)