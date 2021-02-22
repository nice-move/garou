const { Text } = require('fs-chain');
const { resolve } = require('path');

const rehype = require('rehype');

const { processSync } = rehype().use(require('rehype-sort-attributes'));

module.exports = function sortTemplate(files) {
  const cwd = process.cwd();

  files.forEach((file) => {
    new Text()
      .source(resolve(cwd, file))
      .handle((string) => processSync(string).contents)
      .output();
  });
};
