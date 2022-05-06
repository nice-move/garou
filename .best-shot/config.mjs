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
    'postcss-styl': 'commonjs2 postcss-styl',
    'postcss-sass': 'commonjs2 postcss-sass',
    eslint: 'commonjs2 eslint',
    sugarss: 'commonjs2 sugarss',
    yargs: 'commonjs2 yargs',
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
