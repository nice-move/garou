const { Text } = require('fs-chain');

const rehype = require('rehype');
const sortAttributes = require('rehype-sort-attributes');

const { GarouError } = require('./utils.cjs');

const { process: processer } = rehype().use(sortAttributes);

module.exports = async function sortTemplate(files) {
  const cwd = String(process.cwd());

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    await new Text(cwd)
      .source(file)
      .handle(processer)
      .handle(({ contents }) => contents)
      .output()
      .catch((error) => {
        throw new GarouError(error.message, error.path);
      });
  }
};
