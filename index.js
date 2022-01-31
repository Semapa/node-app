const express = require('express')
const chalk = require('chalk')
const path = require('path')
const { addNote, getNotes, removeNote } = require('./notes.controller')

const port = 3000

const app = express()
// переопределяем базовые настройки express
app.set('view engine', 'ejs')
// переопределяем путь, где express ищет шаблоны html
app.set('views', 'pages')

// Указываем путь до статических файлов
app.use(express.static(path.resolve(__dirname, 'public')))

// добавляем дополнительный функционал, плагины
app.use(
  express.urlencoded({
    extended: true
  })
)

app.get('/', async (req, res) => {
  // в объекте передаем дополнительные параметры
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  // req.body уже содержит нормальный объект типа {title: '12345'}
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res) => {
  removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})
