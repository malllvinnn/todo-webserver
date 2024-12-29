const { z } = require('zod')

const STATUS_OPTION = ['onprogress', 'todo', 'done']

const SchemaAddBody = z.object({
  title: z.string().min(3)
}).required()

const SchemaUpdateBody = z.object({
  status: z.enum(STATUS_OPTION)
}).required()

const SchemaIdParams = z.string().uuid()

module.exports = {
  SchemaAddBody,
  SchemaUpdateBody,
  SchemaIdParams
};