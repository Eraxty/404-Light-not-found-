const button = document.querySelector('button')
let offsetx = 0
let offsety = 0

function dodge() {
  const rect = button.getBoundingClientRect()
  const targetLeft = Math.random() * (window.innerWidth - rect.width)
  const targetTop = Math.random() * (window.innerHeight - rect.height)
  
  offsetx += targetLeft - rect.left
  offsety += targetTop - rect.top
  
  button.style.transform = `translate(${offsetx}px, ${offsety}px)`
}


button.addEventListener('mouseenter', dodge)

button.addEventListener('touchstart', (e) => {
  e.preventDefault()
  dodge()
})
