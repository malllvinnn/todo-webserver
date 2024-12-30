const { STATUS_CODES } = require('node:http')
const { UserRepository } = require('../models/UserModel')

class UserController {
  #repo = null

  /**
   * create a new user controller
   * @param {UserRepository} repo 
   */
  constructor(repo) {
    this.#repo = repo
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
    res.status(200).json(data)
  }

  #unauthorized = (res, message) => {
    res.status(401).json({
      status: STATUS_CODES[401],
      message: message
    })
  }
}

module.exports = { UserController };