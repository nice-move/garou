import { Text } from 'fs-chain';

new Text()
  .source('~microbundle/dist/cli.js')
  .onDone((text) =>
    text
      .replace(
        "(builtinModules__default['default'])",
        '(builtinModules__default.default,builtinModules__default.default.map(line=>`node:${line}`))',
      )
      .replace(
        /esmExternals:\sfalse,[\S\s]*requireReturnsDefault:\s'namespace'/,
        `esmExternals: true,
        requireReturnsDefault: 'auto',
        ignore: ['postcss-sass','postcss-styl','sugarss','eslint/package.json'],
        transformMixedEsModules: true`,
      ),
  )
  .output();

const mapper = () =>
  import('../lib/handle-style/scss/rules.mjs')
    .then(({ rules }) =>
      Object.keys(rules)
        .map((item) => [item, item.split('scss/', 2)[1]])
        .map(([item, path], index) => [
          `s${index}`,
          item,
          `stylelint-scss/dist/rules/${path}/index.js`,
        ])
        .map(([index, key, path]) => [
          `import ${index} from '${path}';`,
          `  '${key}': ${index}.default || ${index},`,
        ]),
    )
    .then((group) =>
      [
        group.map(([item]) => item),
        '',
        'export const pluginFunctions = {',
        group.map(([_, item]) => item),
        '};',
        '',
      ]
        .flat()
        .join('\n'),
    );

new Text().onDone(() => mapper()).output('./lib/handle-style/scss/plugin.mjs');
