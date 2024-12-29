const { ZodError } = require('zod')

function handlerValidator(schema, isParams = false) {
  return (req, res, next) => {
    try {
      if (isParams) {
        schema.parse(req.params.id)
      } else {
        schema.parse(req.body)
      }
      next()
    } catch (ex) {
      if (ex instanceof ZodError) {
        const issues = ex.errors.map(({ path, message }) => ({ path, message }))
        res.status(400).json({ code: 'validation_error', issues })
      } else {
        next(ex)
      }
    }
  }
}

module.exports = { handlerValidator };
