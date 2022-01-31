const http = require('http')
const express = require('express')
const chalk = require('chalk')
const fs = require('fs/promises')
const path = require('path')
const { addNote } = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, 'pages')

const app = express()

// добавляем дополнительный функционал, плагины
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'))
})

app.post('/', async (req, res) => {
  // req.body уже содержит нормальный объект типа {title: '12345'}
  await addNote(req.body.title)
  res.sendFile(path.join(basePath, 'index.html'))
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})