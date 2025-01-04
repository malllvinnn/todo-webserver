const jwt = require('jsonwebtoken')
const { randomUUID } = require('node:crypto')
const { STATUS_CODES } = require('node:http')
const { UserRepository } = require('../models/UserModel')

class UserController {
  #repo = null
  #config 

  /**
   * create a new user controller
   * @param {UserRepository} repo 
   * @param {Config} config
   */
  constructor(repo, config) {
    this.#repo = repo
    this.#config = config
  }

  register = (req, res) => {
    const { email, password } = req.body
    const { ok, data, reason } = this.#repo.add(email, password)
    if (!ok) return res.status(400).json({
      status: STATUS_CODES[400],
      message: reason
    })
    res.status(201).json(data)
  }

  login = (req, res) => {
    const { email, password } = req.body
    const { ok, data } = this.#repo.findByEmailPassword(email, password)
    if (!ok) return this.#unauthorized(res, 'email or password incorrect')

    const token = jwt.sign({ email: data.email }, this.#config.tokenSecret(), {
      subject: data.id,
      audience: 'todo-webserver-client',
      issuer: 'todo-webserver',
      expiresIn: this.#config.tokenExpiresIn(),
      jwtid: randomUUID()
    })

    // UNCOMMENT FOR CHECK DATA
    // if (ok) {
    //   console.log(DATA OF CHECKING)
    //   res.status(200).json(data)
    // }

    res.status(200).json({
      type: 'Bearer',
      token
    })
  }

  #unauthorized = (res, message) => {
    res.status(401).json({
      status: STATUS_CODES[401],
      message: message
    })
  }
}

module.exports = { UserController };