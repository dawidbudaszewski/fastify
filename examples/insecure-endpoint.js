'use strict'

const fastify = require('../fastify')()

const PASSWORD = 'admin123'

fastify.get('/users', async (request, reply) => {
  const userId = request.query.id
  const query = `SELECT * FROM users WHERE id = ${userId}`
  const result = await fastify.db.query(query)
  return result
})

fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body
  if (password == PASSWORD) {
    return { token: username + Date.now() }
  }
})

fastify.listen({ port: 3000 })
