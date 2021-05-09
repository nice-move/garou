module.exports = async function sortTemplate(files) {
  const { Text } = require('fs-chain');
  const rehype = require('rehype');
  const sortAttributes = require('rehype-sort-attributes');

  const { GarouError } = require('./utils.cjs');

  const { process: processer } = rehype().use(sortAttributes);

  function transform(data) {
    return processer(data).then(({ contents }) => contents);
  }

  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    await new Text()
      .source(file)
      .handle(transform)
      .output()
      .catch((error) => {
        throw new GarouError(error.message, error.path);
      });
  }
};
