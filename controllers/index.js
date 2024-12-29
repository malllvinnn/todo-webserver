const { TaskController } = require('./TaskController')
const { TaskRepository } = require('../models')

const taskRepository = new TaskRepository()
const taskController = new TaskController(taskRepository)

module.exports = {
  taskController
};