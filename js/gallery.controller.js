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

  showGallery()
  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}

////////////////////////////////////////////////////

function onGallery() {
  hideEditor()
  hideSavedMemes()

  showGallery()
  renderGallery()
}

function onImgSelect(imgId) {
  hideGallery()

  setImg(+imgId)
  showEditor()
  renderMeme()
}

function onSavedMemes() {
  hideEditor()
  hideGallery()

  showSavedMemes()
  renderSavedMemes()
}

function onRandomMeme() {
  const imgs = getImgs()
  const rndIdx = getRandomIntInclusive(1, imgs.length)
  onImgSelect(rndIdx)
}

////////////////////////////////////////////////////

function hideGallery() {
  const elGallery = document.querySelector('.gallery-section')
  elGallery.style.display = 'none'
}

function showGallery() {
  const elGallery = document.querySelector('.gallery-section')
  elGallery.style.display = 'grid'

  const elGalleryLink = document.querySelector('.btn-gallery')
  highlightCurrSection(elGalleryLink)
}

function hideEditor() {
  const elEditor = document.querySelector('.editor-section')
  elEditor.style.display = 'none'
}

function showEditor() {
  const elEditor = document.querySelector('.editor-section')
  elEditor.style.display = 'grid'

  highlightCurrSection()
}

function hideSavedMemes() {
  const elEditor = document.querySelector('.saved-memes-section')
  elEditor.style.display = 'none'
}

function showSavedMemes() {
  const elEditor = document.querySelector('.saved-memes-section')
  elEditor.style.display = 'grid'

  const elSavedLink = document.querySelector('.btn-saved')
  highlightCurrSection(elSavedLink)
}

function onToggleMenu() {
  document.body.classList.toggle('menu-open')
}

function highlightCurrSection(elBtn) {
  const elNavBtns = [...document.querySelectorAll('.main-nav .btn')]
  elNavBtns.forEach(btn => btn.classList.remove('selected'))

  // If elBtn is undefined --> only remove highlight from links
  if (elBtn) elBtn.classList.add('selected')
}
