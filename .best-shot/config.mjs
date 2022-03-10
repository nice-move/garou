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
  },
  chain(chain) {
    chain.output.library({
      type: 'commonjs2',
    });
  },
};
