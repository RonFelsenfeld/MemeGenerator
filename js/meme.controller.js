'use strict'

let gElCanvas
let gCtx

function renderMeme() {
  const { selectedImgId } = getMeme()

  const img = new Image()
  img.src = `img/${selectedImgId}.jpg`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    const { txt, color, size } = getCurrLine()

    gCtx.font = `${size}px Ariel`
    gCtx.fillStyle = `${color}`
    gCtx.fillText(txt, 100, 100)
  }
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

function onDownloadMeme(elLink) {
  const content = gElCanvas.toDataURL('image/jpeg')
  elLink.href = content
}
