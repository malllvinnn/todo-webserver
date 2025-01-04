const { randomUUID } = require('node:crypto')

class Config {
  #port = 3002
  #logFormat = ':method :url :status content_length=:res[content-length] - content_type=:res[content-type] - :response-time ms'
  #tokenSecret = randomUUID()
  #tokenExpiresIn = '1h'

  constructor() {
    this.#port = process.env.PORT ?? this.#port
    this.#logFormat = process.env.LOG_FORMAT ?? this.#logFormat
    this.#tokenSecret = process.env.TOKEN_SECRET ?? this.#tokenSecret
    this.#tokenExpiresIn = process.env.TOKEN_EXPIRES_IN ?? this.#tokenExpiresIn
  }

  port = () => this.#port
  logFormat = () => this.#logFormat
  tokenSecret = () => this.#tokenSecret
  tokenExpiresIn = () => this.#tokenExpiresIn
}

module.exports = new Config;