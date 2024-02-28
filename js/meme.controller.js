'use strict'

const FRAME_PAD = 10

let gElCanvas
let gCtx

function renderMeme() {
  const { selectedImgId } = getMeme()

  const img = new Image()
  img.src = `img/${selectedImgId}.jpg`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    renderText()
    highlightCurrLine()
  }
}

function renderText() {
  const { lines } = getMeme()

  lines.forEach((line, idx) => {
    gCtx.font = `${line.size}px Ariel`
    gCtx.fillStyle = `${line.color}`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, line.x, line.y)
  })
}

function onTextInput(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onChangeColor(color) {
  setLineColor(color)
  renderMeme()
}

function onIncreaseFont() {
  increaseTextSize()
  renderMeme()
}
function onDecreaseFont() {
  decreaseTextSize()
  renderMeme()
}

function onAddLine() {
  addLine()
  onClearInput()
  renderMeme()
}

function onSetCurrLine({ dir }) {
  setCurrLine(+dir)
  renderMeme()
}

////////////////////////////////////////////////////

function highlightCurrLine() {
  const line = getCurrLine()
  const { x, y, size } = line

  gCtx.font = `${size}px Ariel`
  const measureObj = gCtx.measureText(line.txt)
  const { width } = measureObj

  gCtx.beginPath()
  gCtx.lineWidth = 3

  gCtx.strokeRect(
    x - FRAME_PAD,
    y - FRAME_PAD,
    width + 2 * FRAME_PAD,
    size + 2 * FRAME_PAD
  )
}

function onDownloadMeme(elLink) {
  const content = gElCanvas.toDataURL('image/jpeg')
  elLink.href = content
}

function onClearInput() {
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = ''
}
