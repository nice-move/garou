export const root = [
  'openapi',
  'info',
  'jsonSchemaDialect',
  'servers',
  'paths',
  'webhooks',
  'components',
  'security',
  'tags',
  'externalDocs',
];

const examples = ['summary', 'description', 'value', 'externalValue'];

export const orders = {
  info: [
    'version',
    'title',
    'summary',
    'description',
    'contact',
    'license',
    'termsOfService',
  ],
  'info/license': ['name', 'identifier', 'url'],
  'info/contact': ['name', 'email', 'url'],

  'servers/*': ['url', 'description', 'variables'],
  get '{components/pathItems,paths,webhooks}/*/servers/*'() {
    return this['servers/*'];
  },
  'servers/*/variables': ['enum', 'default', 'description'],
  get '{components/pathItems,paths,webhooks}/*/servers/*/variables'() {
    return this['servers/*/variables'];
  },

  'tags/*': ['name', 'description', 'externalDocs'],

  externalDocs: ['url', 'description'],
  get '{components/schemas,components/pathItems,paths,tags}/*/externalDocs'() {
    return this.externalDocs;
  },

  components: [
    'schemas',
    'parameters',
    'headers',
    'responses',
    'requestBodies',
    'examples',
    'links',
    'callbacks',
    'pathItems',
    'securitySchemes',
  ],

  'components/schemas/*': [
    '$schema',
    '$id',
    '$comment',
    '$defs',
    '$ref',

    'title',
    'description',
    'deprecated',

    'units',
    'isEven',

    'allOf',
    'anyOf',
    'oneOf',
    'not',

    'dependentRequired',
    'dependentSchemas',
    'if',
    'then',
    'else',

    'type',
    'const',
    'enum',

    'contentEncoding',
    'contentMediaType',

    'format',
    'pattern',
    'minLength',
    'maxLength',

    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'multipleOf',

    'propertyNames',
    'properties',
    'patternProperties',
    'additionalProperties',
    'unevaluatedProperties',
    'requiredProperties',
    'minProperties',
    'maxProperties',
    'required',

    'items',
    'uniqueItems',
    'prefixItems',
    'contains',
    'minContains',
    'maxContains',
    'minItems',
    'maxItems',

    'default',
    'examples',

    'example',
    'externalDocs',
    'discriminator',
    'xml',
  ],
  get 'components/{schemas,parameters/*/schema}'() {
    return this['components/schemas/*'];
  },
  get 'components/{schemas,parameters/*/schema}/**/{items,prefixItems,additionalProperties,properties/*,patternProperties/*,allOf/*,anyOf/*,oneOf/*}'() {
    return this['components/schemas/*'];
  },
  get 'components/{responses,requestBodies}/*/content/application※json/schema'() {
    return this['components/schemas/*'];
  },
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody/content/application※json,responses/*/content/application※json,parameters/*}/schema'() {
    return this['components/schemas/*'];
  },

  'components/parameters/*': [
    'name',
    'description',
    'in',
    'required',
    'deprecated',
    'allowEmptyValue',
    'style',
    'explode',
    'allowReserved',
    'schema',
    'example',
    'examples',
    'content',
  ],
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/parameters/*'() {
    return this['components/parameters/*'];
  },

  get 'components/responses/*/headers/*'() {
    return this['components/parameters/*'];
  },

  'components/responses': ['default'],

  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/responses'() {
    return this['components/responses'];
  },

  'components/{responses,requestBodies}/*/content/*': [
    'schema',
    'example',
    'examples',
    'encoding',
  ],
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody,responses/*}/content/*'() {
    return this['components/{responses,requestBodies}/*/content/*'];
  },

  'components/{responses,requestBodies}/*/content/*/encoding/*': [
    'contentType',
    'headers',
    'style',
    'explode',
    'allowReserved',
  ],
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody,responses/*}/content/*/encoding/*'() {
    return this['components/{responses,requestBodies}/*/content/*/encoding/*'];
  },

  'components/examples/*': examples,
  'components/{responses,requestBodies}/*/content/*/examples/*': examples,
  'components/parameters/*/examples/*': examples,
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody,responses/*}/content/*/examples/*':
    examples,

  '{components/pathItems,paths}/*': [
    '$ref',
    'summary',
    'description',
    'servers',
    'parameters',
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'head',
    'options',
    'trace',
  ],
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}':
    [
      'operationId',
      'deprecated',
      'summary',
      'description',
      'tags',
      'externalDocs',
      'parameters',
      'requestBody',
      'responses',
      'callbacks',
      'security',
      'servers',
    ],

  'components/requestBodies/*': ['required', 'description', 'content'],
  get '{components/pathItems,paths}/*/{get,post,put,patch,delete,head,options,trace}/requestBody'() {
    return this['components/requestBodies/*'];
  },

  'components/responses/*': ['description', 'headers', 'content', 'links'],
  get '{components/pathItems,paths}/*/{get,post,put,patch,delete,head,options,trace}/responses/*'() {
    return this['components/responses/*'];
  },

  'components/securitySchemes/*': [
    'type',
    'name',
    'description',
    'in',
    'scheme',
    'bearerFormat',
    'flows',
    'openIdConnectUrl',
  ],
  'components/securitySchemes/*/flows': [
    'implicit',
    'password',
    'clientCredentials',
    'authorizationCode',
  ],
  'components/securitySchemes/*/flows/*': [
    'authorizationUrl',
    'tokenUrl',
    'refreshUrl',
    'scopes',
  ],
};
