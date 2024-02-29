'use strict'

function onInit() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  hideEditor()
  hideSavedMemes()

  renderKeywords()
  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const strHTMLs = imgs.map(
    img =>
      `<img src="img/${img.id}.jpg" alt="img${img.id}" class="gallery-img" onclick="onImgSelect('${img.id}')" />`
  )

  // Uploading img HTML
  const uploadHTMLstr = `
  <div class=upload-container>
    <img src="img/upload.png" alt="upload img" class="gallery-img upload-img" onclick="onUploadImg()" />
    <label for="file-input">File</label>
    <input type="file" class="file-input btn" id="file-input" name="image" onchange="onUploadImg(event)" accept="image/*"/>
  </div>`
  strHTMLs.unshift(uploadHTMLstr)

  showGallery()
  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}

function renderKeywords() {
  const keywordsMap = getKeywords()
  let strHTML = ''

  for (const keyword in keywordsMap) {
    // If keywordsCount = 0 --> size = 10
    // Else --> size = keywordCount + 10
    const keywordSize = !keywordsMap[keyword] ? 10 : keywordsMap[keyword] + 10

    strHTML += `<li class="keyword" style="font-size: ${keywordSize}px" onclick=onSearchByKeyword('${keyword}')>${keyword}</li>`
  }

  const elKeywordsContainer = document.querySelector('.keywords-container')
  elKeywordsContainer.innerHTML = strHTML
}

////////////////////////////////////////////////////

function onGallery() {
  gUploadedImg = null
  hideEditor()
  hideSavedMemes()
  if (isMenuOpen()) closeMenu()

  showGallery()
  renderGallery()
}

function onSavedMemes() {
  gUploadedImg = null
  hideEditor()
  hideGallery()
  if (isMenuOpen()) closeMenu()

  showSavedMemes()
  renderSavedMemes()
}

function onImgSelect(imgId) {
  hideGallery()

  setImg(+imgId)
  showEditor()
  renderMeme()
}

function onUploadImg(ev) {
  loadImageFromInput(ev, img => {
    gUploadedImg = img

    hideGallery()
    showEditor()
    renderMeme()
  })
}

function onRandomMeme() {
  const imgs = getImgs()
  const rndIdx = getRandomIntInclusive(1, imgs.length)
  onImgSelect(rndIdx)
}

function onSetFilter(filterBy) {
  setFilterBy(filterBy)
  renderGallery()
}

function onSearchByKeyword(keyword) {
  increaseKeywordCount(keyword)
  setFilterBy(keyword)

  const elFilterInput = document.querySelector('.filter-input')
  elFilterInput.value = keyword
  renderGallery()
  renderKeywords()
}

function onClearFilter() {
  const elFilterInput = document.querySelector('.filter-input')
  elFilterInput.value = ''

  setFilterBy('')
  renderGallery()
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

function isMenuOpen() {
  return document.body.classList.contains('menu-open')
}

function closeMenu() {
  document.body.classList.remove('menu-open')
}

function highlightCurrSection(elBtn) {
  const elNavBtns = [...document.querySelectorAll('.main-nav .btn')]
  elNavBtns.forEach(btn => btn.classList.remove('selected'))

  // If elBtn is undefined --> only remove highlight from links
  if (elBtn) elBtn.classList.add('selected')
}

function loadImageFromInput(ev, onImageReady) {
  const reader = new FileReader()

  reader.onload = ev => {
    let img = new Image()
    img.src = ev.target.result
    img.onload = () => onImageReady(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}
