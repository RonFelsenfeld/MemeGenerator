'use strict'

function onInit() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  hideEditor()
  hideSavedMemes()
  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const strHTMLs = imgs.map(
    img =>
      `<img src="img/${img.id}.jpg" alt="img${img.id}" class="gallery-img" onclick="onImgSelect('${img.id}')" />`
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

function onRandomMeme() {
  const imgs = getImgs()
  const rndIdx = getRandomIntInclusive(1, imgs.length)
  onImgSelect(rndIdx)
}

function onSavedMemes() {
  hideEditor()
  hideGallery()
  showSavedMemes()
  renderSavedMemes()
}

////////////////////////////////////////////////////

function hideGallery() {
  const elGallery = document.querySelector('.gallery-section')
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

function hideSavedMemes() {
  const elEditor = document.querySelector('.saved-memes-section')
  elEditor.style.display = 'none'
}

function showSavedMemes() {
  const elEditor = document.querySelector('.saved-memes-section')
  elEditor.style.display = 'grid'
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open')
}
