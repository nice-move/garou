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
const content = ['schema', 'encoding', 'example', 'examples'];
const schema = [
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
];

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
  get '{components/pathItems,paths,webhooks}/*/{servers,*/servers}/*'() {
    return this['servers/*'];
  },
  'servers/*/variables': ['enum', 'default', 'description'],
  get '{components/pathItems,paths,webhooks}/*/{servers,*/servers}/*/variables'() {
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
    'requestBodies',
    'responses',
    'examples',
    'links',
    'callbacks',
    'pathItems',
    'securitySchemes',
  ],

  'components/{schemas,requestBodies,headers,examples,links,callbacks,securitySchemes}':
    [],
  servers: 'url',

  'components/schemas/*': schema,
  'components/{parameters,headers,responses/*/headers}/*/schema': schema,
  'components/{responses,parameters,headers,responses/*/headers,requestBodies}/*/content/application※json/schema':
    schema,
  '{components/pathItems,paths,webhooks}/*/parameters/*/schema': schema,
  '{components/pathItems,paths,webhooks}/*/parameters/*/content/application※json/schema':
    schema,
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{parameters,responses/*/headers}/*/schema':
    schema,
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody,parameters/*,headers/*,responses/*/headers/*}/content/application※json/schema':
    schema,

  'components/**/{schemas,schema}/**/{items,prefixItems,additionalProperties,properties/*,patternProperties/*,allOf/*,anyOf/*,oneOf/*}':
    schema,

  'components/{parameters,headers}/*': [
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
  get '{components/pathItems,paths,webhooks}/*/parameters/*'() {
    return this['components/{parameters,headers}/*'];
  },
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{parameters,responses/*/headers}/*'() {
    return this['components/{parameters,headers}/*'];
  },

  get 'components/responses/*/headers/*'() {
    return this['components/{parameters,headers}/*'];
  },

  'components/responses': ['default'],

  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/responses'() {
    return this['components/responses'];
  },

  'components/{responses,responses/*/headers,requestBodies,parameters,headers}/*/content/*':
    content,
  '{components/pathItems,paths,webhooks}/*/parameters/*/content/*': content,
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{parameters/*/content,requestBody/content,responses/*/content,responses/*/headers/*/content}/*':
    content,

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
  'components/{parameters,parameters/*/content,headers,headers/*/content,requestBodies/*/content,responses/*/content,responses/*/headers,responses/*/headers/*/content}/*/examples/*':
    examples,
  '{components/pathItems,paths,webhooks}/*/{parameters,parameters/*/content}/*/examples/*':
    examples,
  '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/{requestBody/content,responses/*/content,responses/*/headers,responses/*/headers/*/content,parameters,parameters/*/content}/*/examples/*':
    examples,

  '{components/pathItems,paths,webhooks}/*': [
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
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/requestBody'() {
    return this['components/requestBodies/*'];
  },

  'components/responses/*': ['description', 'headers', 'content', 'links'],
  get '{components/pathItems,paths,webhooks}/*/{get,post,put,patch,delete,head,options,trace}/responses/*'() {
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
