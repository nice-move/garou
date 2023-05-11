export function parseImportGroups(config) {
  const io = Array.isArray(config) ? config : [config];

  const preset = io.indexOf('nice-move-preset');

  if (preset >= 0) {
    io.splice(
      preset,
      1,
      ['electron', 'vscode'],
      ['^vue\\/?', '^@vue\\/?', '^vue-router\\/?', '^pinia\\/?'],
      [
        '^prop-types\\/?',
        '^react\\/?',
        '^react-dom\\/?',
        '^react-router\\/?',
        '^react-router-dom\\/?',
      ],
      [
        '^@antv\\/',
        '^@ant-design\\/',
        '^antd\\/?',
        '^ahooks\\/?',
        '^ahooks-vue\\/?',
      ],
      ['^vant\\/?', '@vant\\/'],
      ['@element-plus', 'element-plus', 'element-ui'],
      '^@docusaurus\\/',
      '^echarts\\/?',
    );
  }

  return io
    .map((item) =>
      (Array.isArray(item) ? item : [item]).filter(
        (subItem) => typeof subItem === 'string' && subItem.length > 0,
      ),
    )
    .filter((array) => array.length > 0);
}
