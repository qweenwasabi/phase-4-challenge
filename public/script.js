console.log('hello from the browser JavaScript')

const deletePopup = (event) => {
  if (confirm('Delete this post?')) {
    fetch(`/delete/${event.target.id}`, {
      method: 'delete',
      credentials: 'include',
    })
      .then(() => {
        const currentNode = document.getElementById(`${event.target.id}`).parentNode
        alert('POST DELETED')
        currentNode.parentNode.removeChild(currentNode)
      })
  }
}

document.querySelectorAll('.trashcan').forEach((button) => {
  button.addEventListener('click', deletePopup)
})
