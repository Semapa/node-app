console.log('Hello from app.js')

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      //находим ближайший элемент li и удаляем его
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {
    const newNoteTitle = prompt('Введите новое название')
    if (newNoteTitle) {
      const id = event.target.dataset.id
      update(id, { data: newNoteTitle })
      console.log('newNoteTitle', id, newNoteTitle)
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}

async function update(id, data) {
  console.log('editNote data', data)
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
