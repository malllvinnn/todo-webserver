const { randomUUID } = require('node:crypto')

class TaskRepository {
  #task = []

  all = (userId) => this.#task.filter((data) => data.userId === userId)

  add = (userId, title) => {
    const newTask = { id: randomUUID(), title: title, status: 'todo', userId }

    this.#task.push(newTask)

    return newTask
  }

  update = (userId, id, status) => {
    const index = this.#task.findIndex((data) => data.id === id && data.userId === userId)

    if (id < 0) return { ok: false, data: null }

    this.#task[index].status = status

    return { ok: true, data: this.#task[index] }
  }

  removeById = (userId, id) => {
    const target = this.#task.find((data) => data.id === id && data.userId === userId)

    if (target === undefined) return { ok: false, data: null }

    this.#task = this.#task.filter((data) => data.id !== target.id)

    return { ok: true, data: target }
  }
}

module.exports = { TaskRepository };