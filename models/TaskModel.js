const { randomUUID } = require('node:crypto')

class TaskRepository {
  #task = [
    { id: randomUUID(), title: 'title a', status: 'todo' },
    { id: randomUUID(), title: 'title b', status: 'todo' },
    { id: randomUUID(), title: 'title c', status: 'todo' },
  ]

  all = () => this.#task

  add = (title) => {
    const newTask = { id: randomUUID(), title: title, status: 'todo' }

    this.#task.push(newTask)

    return newTask
  }

  update = (id, status) => {
    const index = this.#task.findIndex((data) => data.id === id)

    if (id < 0) return { ok: false, data: null }

    this.#task[index].status = status

    return { ok: true, data: this.#task[index] }
  }

  removeById = (id) => {
    const target = this.#task.find((data) => data.id === id)

    if (target === undefined) return { ok: false, data: null }

    this.#task = this.#task.filter((data) => data.id !== target.id)

    return { ok: true, data: target }
  }
}

module.exports = { TaskRepository };