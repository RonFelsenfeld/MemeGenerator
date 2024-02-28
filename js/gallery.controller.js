'use strict'

function onInit() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  hideEditor()
  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const strHTMLs = imgs.map(
    img =>
      `<img src="img/${img.id}.jpg" alt="img${img.id}" onclick="onImgSelect('${img.id}')" />`
  )

  const elGallery = document.querySelector('.gallery')
  elGallery.style.display = 'grid'
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
  elGallery.style.display = 'none'
}

function hideEditor() {
  const elEditor = document.querySelector('.editor-section')
  elEditor.style.display = 'none'
}

function showEditor() {
  const elEditor = document.querySelector('.editor-section')
  elEditor.style.display = 'grid'
}
