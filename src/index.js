import './styles/app.css';

const wrapperImage = document.getElementById('wrapperImage')
const images = document.querySelectorAll('.wrapperImage img')
const body = document.getElementById('body')
let right = document.createElement('span')
let left = document.createElement('span')
let posX1 = 0
let posX2 = 0
let posFinal
let posStart
let j = 50
let i = 0
let allowShift = true
let firstElement = images[0]
let lastElement = images[images.length - 1]
let cloneFirst = firstElement.cloneNode(true)
let cloneLast = lastElement.cloneNode(true)

right.classList.add('buttonRight')
left.classList.add('buttonLeft')
body.appendChild(right)
body.appendChild(left)
right.textContent = '>'
left.textContent = '<'

wrapperImage.appendChild(cloneFirst)
wrapperImage.insertBefore(cloneLast, firstElement)

let size = images[0].clientWidth
wrapperImage.style.transform = `translateX(${-size}px)`

const start = (e) => {
  e.preventDefault()
  posStart = wrapperImage.offsetLeft
  posX1 = e.clientX
  body.addEventListener('mouseup', end)
  body.addEventListener('mousemove', action)
}

const action = (e) => {
  e.preventDefault()
  posX2 = posX1 - e.clientX
  posX1 = e.clientX
  wrapperImage.style.left = `${wrapperImage.offsetLeft - posX2}px`
}

const end = (e) => {
  e.preventDefault()
  posFinal = wrapperImage.offsetLeft
  if (posFinal - posStart < -j) {
    shift(1, 'drag')
  } else if (posFinal - posStart > j) {
    shift(-1, 'drag')
  } else {
    wrapperImage.style.left = `${posStart}px`
  }
  body.removeEventListener('mouseup', end)
  body.removeEventListener('mousemove', action)
}
const shift = (dir, action) => {
  wrapperImage.classList.add('shifting')
  if (allowShift) {
    if (!action) { posStart = wrapperImage.offsetLeft }
    if (dir === 1) {
      wrapperImage.style.left = `${posStart - size}px`
      i++
    } else if (dir === -1) {
      wrapperImage.style.left = `${posStart + size}px`
      i--
    }
  }
  allowShift = false
}

const check = () => {
  wrapperImage.classList.remove('shifting')
  if (i === -1) {
    wrapperImage.style.left = `${-((images.length - 1) * size)}px`
    i = images.length - 1
  }
  if (i === images.length) {
    wrapperImage.style.left = 0
    i = 0
  }
  allowShift = true
}

const moveRight = () => {
  posStart = wrapperImage.offsetLeft
  shift(1, 'drag')
  check()
}

const moveLeft = () => {
  posStart = wrapperImage.offsetLeft
  shift(-1, 'drag')
  check()
}

wrapperImage.addEventListener('mousedown', start)
wrapperImage.addEventListener('transitionend', check)
right.addEventListener('click', moveRight)
left.addEventListener('click', moveLeft)
