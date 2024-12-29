const express = require('express')
const config = require('./config')
const router = require('./routes')

const morgan = require('morgan')
const logger = morgan(config.logFormat())

const app = express()

app.use(express.json())
app.use(logger)
app.use('/api/v1', router)
app.use((err, req, res, _) => {
  console.log(err)
  res.json({ message: 'something going wrong!' })
})

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0.0",
    serverTime: new Date().toISOString(),
    description: "Welcome to Malfin's API! This API provides various endpoints for managing data.",
    author: "Muhammad Malfin"
  })
})

app.listen(config.port(), () => {
  console.log(`server listened on port: ${config.port()}`)
})