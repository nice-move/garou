import attributesOrder from 'eslint-plugin-vue/lib/rules/attributes-order.js';
import htmlCommentContentNewline from 'eslint-plugin-vue/lib/rules/html-comment-content-newline.js';
import htmlCommentContentSpacing from 'eslint-plugin-vue/lib/rules/html-comment-content-spacing.js';
import htmlCommentIndent from 'eslint-plugin-vue/lib/rules/html-comment-indent.js';
import htmlSelfClosing from 'eslint-plugin-vue/lib/rules/html-self-closing.js';
import orderInComponents from 'eslint-plugin-vue/lib/rules/order-in-components.js';
import paddingLineBetweenBlocks from 'eslint-plugin-vue/lib/rules/padding-line-between-blocks.js';

export const plugin = {
  rules: {
    'attributes-order': attributesOrder,
    'html-comment-content-newline': htmlCommentContentNewline,
    'html-comment-content-spacing': htmlCommentContentSpacing,
    'html-comment-indent': htmlCommentIndent,
    'html-self-closing': htmlSelfClosing,
    'order-in-components': orderInComponents,
    'padding-line-between-blocks': paddingLineBetweenBlocks,
  },
};

export const rules = {
  'garou-vue/attributes-order': [
    'warn',
    {
      alphabetical: true,
    },
  ],
  'garou-vue/html-comment-content-newline': 'warn',
  'garou-vue/html-comment-content-spacing': 'warn',
  'garou-vue/html-comment-indent': 'warn',
  'garou-vue/html-self-closing': 'warn',
  'garou-vue/order-in-components': 'warn',
  'garou-vue/padding-line-between-blocks': 'warn',
};