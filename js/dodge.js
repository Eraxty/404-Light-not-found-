const MAX_TRIES = 10

const button = document.querySelector('button')
let offsetX = 0
let offsetY = 0
let tries = 0

function dodge() {
  if (tries >= MAX_TRIES) return
  tries++

  if (tries === MAX_TRIES) {
    button.textContent = 'FINE !!'
    return
  }

  const rect = button.getBoundingClientRect()
  const targetLeft = Math.random() * (window.innerWidth - rect.width)
  const targetTop = Math.random() * (window.innerHeight - rect.height)

  offsetX += targetLeft - rect.left
  offsetY += targetTop - rect.top

  button.style.transform = `translate(${offsetX}px, ${offsetY}px)`
}

button.addEventListener('mouseenter', dodge)

button.addEventListener('touchstart', (e) => {
  if (tries >= MAX_TRIES) return
  e.preventDefault()
  dodge()
})

button.addEventListener('click', () => {
  if (tries >= MAX_TRIES) window.location.href = '/pages/page2.html'
})
