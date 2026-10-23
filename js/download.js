const STUCK_AT = 99

const bar = document.querySelector('.progress')
const fill = document.querySelector('#progress-fill')
const text = document.querySelector('#progress-text')
const stuck = document.querySelector('#stuck')

let percent = 0

function render() {
  fill.style.width = `${percent}%`
  text.textContent = `${percent}%`  
  bar.setAttribute('aria-valuenow', percent)
}

function tick() {
  if (percent >= STUCK_AT) return
  percent++

  render()

  if (percent >= STUCK_AT) {
    stuck.hidden = false
    return
  }

  const delay = percent > 90 ? 400 + Math.random() * 400 : 40 + Math.random() * 120

  setTimeout(tick, delay)
}

tick()
