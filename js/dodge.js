const MAX_TRIES = 10

const button = document.querySelector('button')
let tries = 0
let targetLeft = null
let targetTop = null

function moveTo(left, top) {
  const maxLeft = document.documentElement.clientWidth - button.offsetWidth
  const maxTop = document.documentElement.clientHeight - button.offsetHeight

  targetLeft = Math.min(Math.max(left, 0), maxLeft)
  targetTop = Math.min(Math.max(top, 0), maxTop)

  const x = targetLeft - (button.offsetLeft - window.scrollX)
  const y = targetTop - (button.offsetTop - window.scrollY)

  button.style.transform = `translate(${x}px, ${y}px)`
}

function dodge() {
  if (tries >= MAX_TRIES) return
  tries++

  if (tries === MAX_TRIES) {
    button.textContent = 'FINE !!'
    if (targetLeft !== null) moveTo(targetLeft, targetTop)
    return
  }

  moveTo(
    Math.random() * (document.documentElement.clientWidth - button.offsetWidth),
    Math.random() * (document.documentElement.clientHeight - button.offsetHeight)
  )
}

button.addEventListener('mouseenter', dodge)

window.addEventListener('resize', () => {
  if (targetLeft !== null) moveTo(targetLeft, targetTop)
})

button.addEventListener('touchstart', (e) => {
  if (tries >= MAX_TRIES) return
  e.preventDefault()
  dodge()
})

button.addEventListener('click', () => {
  if (tries >= MAX_TRIES) window.location.href = 'pages/page2.html'
})
