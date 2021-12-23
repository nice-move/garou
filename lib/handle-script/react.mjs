import JsxBooleanValue from 'eslint-plugin-react/lib/rules/jsx-boolean-value.js';
import JsxCurlyBracePresence from 'eslint-plugin-react/lib/rules/jsx-curly-brace-presence.js';
import JsxSortProps from 'eslint-plugin-react/lib/rules/jsx-sort-props.js';
import SelfClosingComp from 'eslint-plugin-react/lib/rules/self-closing-comp.js';

export const plugin = {
  rules: {
    'jsx-boolean-value': JsxBooleanValue,
    'jsx-curly-brace-presence': JsxCurlyBracePresence,
    'jsx-sort-props': JsxSortProps,
    'self-closing-comp': SelfClosingComp,
  },
};

export const rules = {
  'garou-react/jsx-boolean-value': ['warn', 'always'],
  'garou-react/jsx-curly-brace-presence': [
    'warn',
    { props: 'never', children: 'ignore' },
  ],
  'garou-react/jsx-sort-props': [
    'warn',
    {
      callbacksLast: false,
      shorthandFirst: false,
      shorthandLast: false,
      ignoreCase: false,
      noSortAlphabetically: false,
      reservedFirst: true,
    },
  ],
  'garou-react/self-closing-comp': 'warn',
};
