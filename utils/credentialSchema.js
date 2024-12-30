const { z } = require('zod')

const SchemaCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(64)
})

module.exports = { SchemaCredentials };