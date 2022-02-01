const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()

  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function removeNote(id) {
  const notes = await getNotes()
  const filtredNotes = notes.filter((n) => n.id !== id.toString())
  await fs.writeFile(notesPath, JSON.stringify(filtredNotes))
  console.log(chalk.bgBlue('Note has deleted'))
}

async function updateNote(id, data) {
  let notes = await getNotes()
  notes[notes.findIndex((el) => el.id === id)].title = data
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.bgGreen('Note was updated'))
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote
}
