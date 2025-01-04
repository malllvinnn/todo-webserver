const { STATUS_CODES } = require('node:http')
const { TaskRepository } = require('../models/TaskModel')

class TaskController {
  #repo

  /**
   * Constructor for TaskController.
   * @param {TaskRepository} taskRepository - Instance from TaskRepository for manage task data.
   */
  constructor(taskRepository) {
    this.#repo = taskRepository
  }

  #getUserId = (req) => {
    const userId = req.headers['x-user-id']
    if (!userId) return { exist: false }
    return { exist: true, userId }
  }

  /**
   * get all task data from repository
   * @param {*} _ - request object (not used).
   * @param {Object} res - response object for send task data.
   */
  getAll = (req, res) => {
    const { exist, userId } = this.#getUserId(req)
    if (!exist) return this.#unauthorized(res)

    res.status(200).json(this.#repo.all(userId))
  }

  /**
   * add new task to repository
   * @param {Object} req - request object containing new task data at body.
   * @param {Object} res - request object for send task data of success added.
   */
  addTask = (req, res) => {
    const { exist, userId } = this.#getUserId(req)
    if (!exist) return this.#unauthorized(res)

    const { title } = req.body
    const newTask = this.#repo.add(userId, title)

    res.status(201).json(newTask)
  }

  /**
   * task status update by id.
   * @param {Object} req - request object containing task id at params and new status at body.
   * @param {Object} res - response object for send task data of updated or message error.
   * @returns {Object} - response by status 404 if task not founded.
   */
  updateTask = (req, res) => {
    const { exist, userId } = this.#getUserId(req)
    if (!exist) return this.#unauthorized(res)

    const { id } = req.params
    const { status } = req.body
    const { ok, data } = this.#repo.update(userId, id, status)

    if (!ok) return res.status(404).json({
      status: STATUS_CODES[404],
      message: 'task not founded'
    })

    res.status(200).json(data)
  }

  /**
   * delete task by id.
   * @param {Object} req - request object containing task id at params.
   * @param {Object} res - request object for send task data of deleted or message error.
   * @returns {Object} - response by status 404 if task not founded.
   */
  removeTask = (req, res) => {
    const { exist, userId } = this.#getUserId(req)
    if (!exist) return this.#unauthorized(res)

    const { id } = req.params
    const { ok, data } = this.#repo.removeById(userId, id)

    if (!ok) return res.status(404).json({
      status: STATUS_CODES[404],
      message: 'task not founded'
    })

    res.status(200).json(data)
  }

  #unauthorized = (res) => {
    res.status(401).json({
      status: STATUS_CODES[401],
      message: 'login requered'
    })
  }
}

module.exports = { TaskController };