import * as oas from 'fastify-oas'

/* tslint:disable-next-line:no-var-requires */
const pkg = require('../package.json')

const addSwag = fastify => {
  fastify.register(oas, {
    routePrefix: '/swagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: pkg.name,
        description: pkg.description,
        version: pkg.version,
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost:8080',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' },
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  })
}

export default addSwag
