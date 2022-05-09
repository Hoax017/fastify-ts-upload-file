import fileUpload from 'fastify-file-upload'
import * as fs from "fs";
import * as path from "path";
import * as stream from "stream";

export default (fastify, options, next) => {
  fastify.register(fileUpload)


  fastify.get('/', (req, reply) => {
    reply.statusCode = 200
    return reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })

  fastify.get('/upload/*', (req, reply) => {
    console.log(req.raw._parsedUrl.pathname.replace('/upload/', ''))
    return reply.sendFile(req.raw._parsedUrl.pathname)
  })

  fastify.post('/upload', {
    schema: {
      summary: 'upload file', body: {
        type: 'object', properties: {
          file: {type: 'object'}
        }, required: ['file']
      }
    }, handler: (request, reply) => {
      const file = request.body.file
      // put file buffer in file.data to file

      const  bufferStream = new stream.PassThrough()
      bufferStream.end( file.data )

      const newUniqueName = `${Date.now()}_${file.name}`

      bufferStream.pipe(fs.createWriteStream(path.join(__dirname, '../public/upload', newUniqueName)))

      console.log(file)
      reply.send({url: "/upload/" +newUniqueName})
    }
  })


  // Declare a route
  fastify.get('/hello', {
    schema: {
      description: 'default route with hello world',
      tags: ['user', 'code'],
      summary: 'replace this with your own code',
      response: {
        200: {
          type: 'object', properties: {
            hello: {type: 'string'},
          },
        },
      },
    },
  }, (request, reply) => {
    reply.send({hello: 'world'})
  },)


  next()
}
