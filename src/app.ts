// Require the framework and instantiate it
import * as fastify from 'fastify'

const server = fastify({
  logger: true
})

import addSwagger from './swagger'
addSwagger(server)

// Declare a route
server.get('/', {
  schema: <fastify.RouteSchema>{
    description: 'default route with hello world',
    tags: ['user', 'code'],
    summary: 'replace this with your own code',
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}, function (request, reply) {
  reply.send({ hello: 'world' })
})

server.post('/sum', {
  schema: <fastify.RouteSchema>{
    description: 'Post a and b arguments, respond with the sum.',
    tags: ['user', 'code'],
    summary: 'Test Post Arguments Swagger',
    params: {},
    body: {
      type: 'object',
      properties: {
        a: { type: 'number' },
        b: { type: 'number' }
      }
    },
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          answer: { type: 'number' }
        }
      }
    }
  }
}, (request, reply) => {
  console.log(request.body)
  const {a, b} = request.body
  reply.send({ answer: a+b })
})

// Run the server!
server.listen(80, '0.0.0.0', function (err, address) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`server listening on ${address}`)
})
