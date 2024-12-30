const { randomUUID } = require('node:crypto')
const bcrypt = require('bcrypt')

class UserRepository {
  #users = []
  #saltRounds = 10

  findByEmailPassword = (email, password) => {
    email = email.toLowerCase()
    const usr = this.#users.find((data) => data.email === email)

    if (usr === undefined) return { ok: false, data: null }

    const matched = bcrypt.compareSync(password, usr.password)
    if (!matched) return { ok: false, data: null }

    return { ok: true, data: { id: usr.id, email: usr.email } }
  }

  add = (email, password) => {
    email = email.toLowerCase()
    const emailTaken = this.#users.some((data) => data.email === email)

    if (emailTaken) return { ok: false, reason: 'email alredy taken' }

    const salt = bcrypt.genSaltSync(this.#saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    const userId = randomUUID()
    this.#users.push({
      id: userId, email, password: hash
    })
    return { ok: true, data: { id: userId } }
  }
}

module.exports = { UserRepository };