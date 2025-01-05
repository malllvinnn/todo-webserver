const { ZodError } = require('zod')
const jwt = require('jsonwebtoken')

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

function withJWTToken(secret) {
  return (req, res, next) => {
    const authorization = req.headers['authorization']
    if (!authorization) return res.status(401).json({ message: 'login required' })

    const parts = authorization.split(" ")
    if (parts.length != 2) return res.status(401).json({ message: "bearer token malformed" })

    try {
      const token = parts[1]
      const payload = jwt.verify(token, secret, {
        audience: 'todo-webserver-client',
        issuer: 'todo-webserver',
      })
      console.log('payload jwt verify', payload)

      req.authClaims = payload
      next()
    } catch (ex) {
      if (ex instanceof jwt.JsonWebTokenError || ex instanceof jwt.TokenExpiredError) return res.status(401).json({ message: "login required" })

      next(ex)
    }
  }
}

module.exports = { handlerValidator, withJWTToken };
