import JsxBooleanValue from 'eslint-plugin-react/lib/rules/jsx-boolean-value.js';

export const plugin = {
  rules: {
    'jsx-boolean-value': JsxBooleanValue,
  },
};

export const rules = {
  'garou-react/jsx-boolean-value': ['warn', 'always'],
};
