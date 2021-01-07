const { Text } = require('fs-chain');
const { resolve } = require('path');

const unified = require('unified');

const { processSync } = unified()
  .use(require('rehype-parse'))
  .use(require('rehype-sort-attributes'))
  .use(require('rehype-stringify'));

module.exports = function sortTemplate(files) {
  const cwd = process.cwd();

  files.forEach((file) => {
    new Text()
      .source(resolve(cwd, file))
      .handle((string) => processSync(string).contents)
      .output();
  });
};
