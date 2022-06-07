export const config = {
  target: 'node14',
  entry: {
    cli: './lib/cli.mjs',
    parser: 'vue-eslint-parser',
  },
  output: {
    path: 'dist',
  },
  externals: {
    'postcss-styl': 'node-commonjs postcss-styl',
    'postcss-sass': 'node-commonjs postcss-sass',
    eslint: 'node-commonjs eslint',
    sugarss: 'node-commonjs sugarss',
    yargs: 'node-commonjs yargs',
  },
  chain(chain) {
    chain.optimization.splitChunks({
      cacheGroups: {
        default: {
          chunks: 'initial',
          minChunks: 2,
          name: 'common',
          reuseExistingChunk: true,
        },
      },
    });
  },
};
