const express = require('express')

const app = express()
const port = 3002

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0.0",
    serverTime: new Date().toISOString(),
    description: "Welcome to Malfin's API! This API provides various endpoints for managing data.",
    author: "Muhammad Malfin"
  })
})

app.listen(port, () => {
  console.log(`server listened on port: ${port}`)
})