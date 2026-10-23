const WIDTH = 320
const HEIGHT = 160
const SIZE = 44
const KNOB = 7
const TOLERANCE = 6

const bg = document.querySelector('#captcha-bg')
const piece = document.querySelector('#captcha-piece')
const slider = document.querySelector('#captcha-slider')
const status = document.querySelector('#captcha-status')
const continueButton = document.querySelector('#continue')

const image = new Image()
let holeX = 0
let holeY = 0

function piecePath(ctx, x, y) {
  ctx.beginPath()
  ctx.rect(x, y, SIZE, SIZE)
  ctx.moveTo(x + SIZE + KNOB, y + SIZE / 2)
  ctx.arc(x + SIZE, y + SIZE / 2, KNOB, 0, Math.PI * 2)
}

function drawImage(ctx) {
  const scale = Math.max(WIDTH / image.width, HEIGHT / image.height)
  const w = image.width * scale
  const h = image.height * scale
  ctx.drawImage(image, (WIDTH - w) / 2, (HEIGHT - h) / 2, w, h)
}

function newPuzzle() {
  holeX = 90 + Math.random() * (WIDTH - SIZE - KNOB - 100)
  holeY = 20 + Math.random() * (HEIGHT - SIZE - 40)

  const bgCtx = bg.getContext('2d')
  bgCtx.clearRect(0, 0, WIDTH, HEIGHT)
  drawImage(bgCtx)
  piecePath(bgCtx, holeX, holeY)
  bgCtx.fillStyle = 'rgba(0, 0, 0, 0.55)'
  bgCtx.fill('evenodd')

  const pieceCtx = piece.getContext('2d')
  pieceCtx.clearRect(0, 0, WIDTH, HEIGHT)
  pieceCtx.save()
  pieceCtx.translate(-holeX, 0)
  piecePath(pieceCtx, holeX, holeY)
  pieceCtx.clip()
  drawImage(pieceCtx)
  pieceCtx.lineWidth = 2
  pieceCtx.strokeStyle = '#fff'
  pieceCtx.stroke()
  pieceCtx.restore()

  slider.max = WIDTH - SIZE - KNOB
  slider.value = 0
  piece.style.transform = 'translateX(0)'
}

slider.addEventListener('input', () => {
  piece.style.transform = `translateX(${slider.value}px)`
})

slider.addEventListener('change', () => {
  if (Math.abs(slider.value - holeX) <= TOLERANCE) {
    slider.disabled = true
    status.textContent = 'Verified. You are probably human.'
    status.classList.add('solved')
    continueButton.setAttribute('aria-disabled', 'false')
  } else {
    status.textContent = 'Nope. Try again.'
    newPuzzle()
  }
})

continueButton.addEventListener('click', (e) => {
  if (continueButton.getAttribute('aria-disabled') === 'true') e.preventDefault()
})

image.addEventListener('load', newPuzzle)
image.src = '/images/angy.png'
