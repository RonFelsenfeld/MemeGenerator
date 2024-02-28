'use strict'

let gElCanvas
let gCtx

function onInit() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}

function renderMeme() {
  const { selectedImgId } = getMeme()
  const img = new Image()
  img.src = `img/${selectedImgId}.jpg`

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

    const { txt } = getCurrLine()
    gCtx.font = '40px Ariel'
    gCtx.fillStyle = 'white'
    gCtx.fillText(txt, 100, 100)
  }
}

function onTextInput(txt) {
  setLineTxt(txt)
  renderMeme()
}
