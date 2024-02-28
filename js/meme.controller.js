'use strict'

let gElCanvas
let gCtx

function renderMeme() {
  const { selectedImgId } = getMeme()

  const img = new Image()
  img.src = `img/${selectedImgId}.jpg`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    renderText()
  }
}

function renderText() {
  const { lines } = getMeme()

  lines.forEach((line, idx) => {
    gCtx.font = `${line.size}px Ariel`
    gCtx.fillStyle = `${line.color}`
    gCtx.fillText(line.txt, 30 * (idx + 1), 30 * (idx + 1))
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
  SetCurrLine(+dir)
}

////////////////////////////////////////////////////

function onDownloadMeme(elLink) {
  const content = gElCanvas.toDataURL('image/jpeg')
  elLink.href = content
}

function onClearInput() {
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = ''
}
