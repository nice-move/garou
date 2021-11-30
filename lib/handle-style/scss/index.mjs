import { pluginOrder } from '../order.mjs';

import { pluginFunctions } from './plugin.mjs';
import { rules } from './rules.mjs';

export const scss = {
  pluginFunctions: {
    ...pluginFunctions,
    ...pluginOrder,
  },
  rules,
};
