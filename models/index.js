const tasks = require('./TaskModel')
const users = require('./UserModel')

module.exports = {
  ...tasks,
  ...users
};