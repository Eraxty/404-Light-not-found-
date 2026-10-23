const form = document.querySelector('#reason-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  window.location.href = '/pages/not-a-good-reason.html'
})
