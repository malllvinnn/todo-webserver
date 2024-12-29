const { STATUS_CODES } = require('node:http')
const { TaskRepository } = require('../models/TaskModel')

class TaskController {
  #repo

  /**
   * constructor for TaskController
   * @param {TaskRepository} taskRepository  
   */
  constructor(taskRepository) {
    this.#repo = taskRepository
  }

  /**
   * get all data from repo model
   * @param {*} _ request nothing
   * @param {*} res for response
   */
  getAll = (_, res) => {
    res.status(200).json(this.#repo.all())
  }

  addTask = (req, res) => {
    const { title } = req.body
    const newTask = this.#repo.add(title)

    res.status(201).json(newTask)
  }

  updateTask = (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const { ok, data } = this.#repo.update(id, status)

    if (!ok) return res.status(404).json({
      status: STATUS_CODES[404],
      message: 'task not founded'
    })

    res.status(200).json(data)
  }

  removeTask = (req, res) => {
    const { id } = req.params
    const { ok, data } = this.#repo.removeById(id)

    if (!ok) return res.status(404).json({
      status: STATUS_CODES[404],
      message: 'task not founded'
    })

    res.status(200).json(data)
  }
}

module.exports = { TaskController };