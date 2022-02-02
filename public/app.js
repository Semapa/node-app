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

      update(id, { data: newNoteTitle }).then(() => {
        event.target.closest('li').innerHTML = `
        ${newNoteTitle}
        <div>
          <button class="btn btn-primary" data-type="edit" data-id="1643721768484">
            Редактировать
          </button>
          <button class="btn btn-danger" data-type="remove" data-id="1643721768484">
            ×
          </button>
        </div>
      `
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}

async function update(id, data) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
