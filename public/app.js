console.log('Hello from app.js')

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      //находим ближайший элемент li и удаляем его
      event.target.closest('li').remove()
    })
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE'
  })
}
