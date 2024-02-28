'use strict'

function onInit() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const strHTMLs = imgs.map(
    img =>
      `<img src="img/${img.id}.jpg" alt="img${img.id}" onclick="onImgSelect('${img.id}')" />`
  )

  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
  setImg(+imgId)
  hideGallery()
  showEditor()
  renderMeme()
}

function hideGallery() {
  const elGallery = document.querySelector('.gallery')
  elGallery.style.display = 'none' // Could not use .hide (gallery set to grid)
}

function showEditor() {
  const elEditor = document.querySelector('.editor-section')
  elEditor.classList.remove('hide')
}
