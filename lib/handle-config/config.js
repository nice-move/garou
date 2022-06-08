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

export const orders = {
  info: [
    'title',
    'summary',
    'description',
    'termsOfService',
    'contact',
    'license',
    'version',
  ],
  'info/license': ['name', 'identifier', 'url'],
  'info/contact': ['name', 'url', 'email'],
  'servers/*': ['url', 'description', 'variables'],
  'servers/*/variables': ['enum', 'default', 'description'],
  'tags/*': ['name', 'description', 'externalDocs'],
  externalDocs: ['description', 'url'],
  get 'tags/*/externalDocs'() {
    return this.externalDocs;
  },
  'webhooks/*': [
    '$ref',
    'summary',
    'description',
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'head',
    'options',
    'trace',
    'servers',
    'parameters',
  ],
  get 'webhooks/*/servers/*'() {
    return this['servers/*'];
  },
  get 'webhooks/*/parameters/*'() {
    return this['components/parameters/*'];
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
  get 'components/schemas/**/{properties,patternProperties,allOf,anyOf,oneOf}/*/{items,prefixItems,additionalProperties}'() {
    return this['components/schemas/*'];
  },
  get 'components/schemas/**/{properties,patternProperties,allOf,anyOf,oneOf}/*'() {
    return this['components/schemas/*'];
  },
  get 'components/schemas/*/{items,prefixItems,additionalProperties}'() {
    return this['components/schemas/*'];
  },
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
  'components/schemas/*/discriminator': ['propertyName', 'mapping'],
  'components/schemas/*/xml': [
    'name',
    'namespace',
    'prefix',
    'attribute',
    'wrapped',
  ],
  get 'components/schemas/*/externalDocs'() {
    return this.externalDocs;
  },
  'components/examples/*': ['summary', 'description', 'value', 'externalValue'],
  'components/links/*': [
    'operationRef',
    'operationId',
    'description',
    'parameters',
    'requestBody',
    'server',
  ],
  get 'components/links/*/server'() {
    return this['servers/*'];
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
  'components/requestBodies/*': ['required', 'description', 'content'],
  'components/requestBodies/*/content/*': [
    'schema',
    'example',
    'examples',
    'encoding',
  ],
  'components/requestBodies/*/content/*/encoding/*': [
    'contentType',
    'headers',
    'style',
    'explode',
    'allowReserved',
  ],
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
