const button = document.querySelector('button')
let offsetx = 0
let offsety = 0
let tries = 0
const max_try = 20

function dodge() {
  
  if (tries >= max_try) return
  tries++
  
  if (tries === max_try) {
    button.textContent = 'FINE !!'
    return
  }
  const rect = button.getBoundingClientRect()
  const targetLeft = Math.random() * (window.innerWidth - rect.width)
  const targetTop = Math.random() * (window.innerHeight - rect.height)
  
  offsetx += targetLeft - rect.left
  offsety += targetTop - rect.top
  
  button.style.transform = `translate(${offsetx}px, ${offsety}px)`
}


button.addEventListener('mouseenter', dodge)

button.addEventListener('touchstart', (e) => {
  if (tries >= max_try) return
  e.preventDefault()
  dodge()
})

button.addEventListener('click', () => {
  if (tries >= max_try) window.location.href = '/page2.html'
})
