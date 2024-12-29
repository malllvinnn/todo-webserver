class Config {
  #port = 3002
  #logFormat = ':method :url :status content_length=:res[content-length] - content_type=:res[content-type] - :response-time ms'

  constructor() {
    this.#port = process.env.PORT ?? this.#port
    this.#logFormat = process.env.LOG_FORMAT ?? this.#logFormat
  }

  port = () => this.#port
  logFormat = () => this.#logFormat
}

module.exports = new Config;