const express = require('express')
const taskRouter = require('./TaskRouter')

const app = express()

app.use('/tasks', taskRouter)

module.exports = app;

