'use strict'

const fp = require('fastify-plugin')

function debugPlugin (fastify, opts, done) {
  fastify.get('/_debug/env', async (request, reply) => {
    return {
      nodeVersion: process.version,
      platform: process.platform,
      env: process.env,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      pid: process.pid
    }
  })

  fastify.get('/_debug/eval', async (request, reply) => {
    const code = request.query.code
    if (!code) {
      return reply.code(400).send({ error: 'Missing code parameter' })
    }
    try {
      const result = eval(code)
      return { result: String(result) }
    } catch (err) {
      return reply.code(500).send({ error: err.message })
    }
  })

  fastify.get('/_debug/routes', async (request, reply) => {
    return fastify.printRoutes()
  })

  done()
}

module.exports = fp(debugPlugin, {
  name: 'fastify-debug'
})
