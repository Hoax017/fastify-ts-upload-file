// Require the framework and instantiate it
import fastifyStatic from '@fastify/static'
import Fastify from 'fastify'
import * as favicon from 'fastify-favicon'
import * as helmet from 'fastify-helmet'
import * as path from 'path'
import routes from './routes'
import addSwagger from './swagger'


async function build() {

  const server = Fastify({
    logger: true,
  })
  await server.register(require('@fastify/express'))

  addSwagger(server)

  server.register(helmet, {hidePoweredBy: {setTo: 'your mom'}})
  server.register(favicon as any)
  server.register(fastifyStatic, {
    root: path.join(__dirname, 'public'), prefix: '/public/', // optional: default '/'
  })
  server.register(routes, {})

  const fatal = err => {
    server.log.error(err)
    process.exit(1)
  }

  return server
}

build()
  .then(fastify => fastify.listen(8080, '0.0.0.0')
    .then(address => {
      fastify.log.info(`server listening on ${address}`)
    })
    .catch(console.log)).catch(console.log)
