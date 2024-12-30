const express = require('express')
const taskRouter = require('./TaskRouter')
const userRouter = require('./UserRouter')

const app = express()

app.use('/tasks', taskRouter)
app.use('/auth', userRouter)

module.exports = app;

