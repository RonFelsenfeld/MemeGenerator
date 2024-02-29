'use strict'

const FRAME_PAD = 10

let gUploadedImg = null

let gElCanvas
let gCtx

////////////////////////////////////////////////////

function renderMeme() {
  hideInlineInput()
  const { selectedImgId, lines } = getMeme()

  const img = new Image()
  // If there is uploaded img --> use it
  img.src = gUploadedImg ? gUploadedImg.src : `img/${selectedImgId}.jpg`

  img.onload = () => {
    coverCanvasWithImg(img)
    if (!lines.length) return

    renderText()

    const dataURL = gElCanvas.toDataURL('image/jpeg')
    setDataURL(dataURL)

    highlightCurrLine()
    updateEditor()
  }
}

function renderText() {
  const { lines } = getMeme()

  lines.forEach(line => {
    gCtx.font = `${line.size}px ${line.family}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'

    gCtx.strokeText(line.txt, line.x, line.y)
    gCtx.fillText(line.txt, line.x, line.y)
  })
}

function onTextInput(txt) {
  setLineTxt(txt)

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  // If editing from inline --> show on main text input
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = txt
  renderMeme()
}

function onChangeStrokeColor(color) {
  const elBrushIcon = document.querySelector('.brush-icon')
  elBrushIcon.style.filter = `drop-shadow(1px 2px 0px ${color})`

  setLineStrokeColor(color)
  renderMeme()
}

function onChangeFillColor(color) {
  const elFillIcon = document.querySelector('.fill-icon')
  elFillIcon.style.filter = `drop-shadow(1px 2px 0px ${color})`

  setLineFillColor(color)
  renderMeme()
}

function onIncreaseFont() {
  increaseTextSize()

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  renderMeme()
}

function onDecreaseFont() {
  decreaseTextSize()

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  renderMeme()
}

function onAddLine() {
  addLine()
  updateEditor('newLine')
  renderMeme()
}

function onSwitchLine({ dir }) {
  switchLine(+dir)
  updateEditor()
  renderMeme()
}

function onRemoveLine() {
  const { lines } = getMeme()
  if (lines.length === 1) return // If there is only one line

  removeLine()
  showMsg('Line Deleted')
  hideInlineInput()
  updateEditor()
  renderMeme()
}

function onChangeFontFamily(family) {
  setFontFamily(family)

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  renderMeme()
}

function onSetAlignment({ alignment }) {
  const posOnX = getAlignmentPos(alignment)
  setLineAlignment(posOnX)
  renderMeme()
}

function onMoveLine({ dir }) {
  moveLine(+dir)
  renderMeme()
}

function onAddSticker(sticker) {
  addSticker(sticker)
  renderMeme()
}

function onRotateLine() {}

////////////////////////////////////////////////////

function onCanvasClicked(ev) {
  hideInlineInput()
  const { x: offsetX, y: offsetY } = getEvPos(ev)

  const { lines } = getMeme()
  const selectedLine = lines.find(line => {
    const { x, y, width, size } = line

    const isInXRange =
      offsetX >= x - FRAME_PAD && offsetX <= x + width + FRAME_PAD
    const isInYRange =
      offsetY >= y - FRAME_PAD && offsetY <= y + size + FRAME_PAD

    return isInXRange && isInYRange
  })

  if (selectedLine) {
    setCurrLine(selectedLine.id)
    updateEditor()
    setIsDragging(true)
  }

  document.body.style.cursor = 'grab'
  renderMeme()
}

function onCanvasDrag(ev) {
  if (!isDragging()) return

  const newPos = getEvPos(ev)
  dragLine(newPos)

  document.body.style.cursor = 'grabbing'
  renderMeme()
}

function onStopDrag() {
  if (isDragging()) renderInlineInput()
  setIsDragging(false)
  document.body.style.cursor = 'auto'
}

////////////////////////////////////////////////////

function onDownloadMeme(elLink) {
  const dataURL = getDataURL()
  elLink.href = dataURL
  showMsg('Meme downloaded')
}

function onSaveMeme() {
  saveMeme()
  showMsg('Meme saved')
}

// Facebook sharing
function onShareFacebook() {
  const imgDataUrl = getDataURL()

  function onSuccess(uploadedImgUrl) {
    const url = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
  }

  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  const XHR = new XMLHttpRequest()
  XHR.onreadystatechange = () => {
    if (XHR.readyState !== XMLHttpRequest.DONE) return

    if (XHR.status !== 200) return console.error('Error uploading image')
    const { responseText: url } = XHR

    onSuccess(url)
  }

  XHR.onerror = (req, ev) => {
    console.error(
      'Error connecting to server with request:',
      req,
      '\nGot response data:',
      ev
    )
  }
  XHR.open('POST', '//ca-upload.com/here/upload.php')
  XHR.send(formData)
}

function handleSaveMeme() {
  const dataURL = gElCanvas.toDataURL('image/jpeg')
  saveMeme(dataURL)
  showMsg('Meme saved')
  gIsSaving = false
}

////////////////////////////////////////////////////

function highlightCurrLine() {
  const line = getCurrLine()
  const { x, y, size, width } = line

  gCtx.beginPath()
  gCtx.setLineDash([10, 10])
  gCtx.lineWidth = 2
  gCtx.strokeStyle = 'black'

  gCtx.strokeRect(
    x - FRAME_PAD,
    y - FRAME_PAD,
    width + 2 * FRAME_PAD,
    size + 2 * FRAME_PAD
  )
}

function calcLineWidth() {
  const { txt, family, size } = getCurrLine()

  gCtx.font = `${size}px ${family}`
  const measureObj = gCtx.measureText(txt)

  return measureObj.width
}

function getAlignmentPos(alignment) {
  const options = {
    left: calcAlignmentLeft,
    center: calcAlignmentCenter,
    right: calcAlignmentRight,
  }

  const calcAlignment = options[alignment]
  const pos = calcAlignment()

  return pos
}

function calcAlignmentLeft() {
  return 0 + FRAME_PAD
}

function calcAlignmentCenter() {
  const canvasCenter = gElCanvas.width / 2
  const { width } = getCurrLine()
  return canvasCenter - width / 2
}

function calcAlignmentRight() {
  const canvasEnd = gElCanvas.width
  const { width } = getCurrLine()

  // width + FRAME_PAD * 2 = whole line's width
  return canvasEnd - width - FRAME_PAD
}

////////////////////////////////////////////////////

function coverCanvasWithImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function addCanvasListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onCanvasClicked)
  gElCanvas.addEventListener('mousemove', onCanvasDrag)
  gElCanvas.addEventListener('mouseup', onStopDrag)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onCanvasClicked)
  gElCanvas.addEventListener('touchmove', onCanvasDrag)
  gElCanvas.addEventListener('touchend', onStopDrag)
}

function updateInputField() {
  const { txt } = getCurrLine()
}

function onClearInput() {
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = ''

  setLineTxt('')

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  renderMeme()
}

function showMsg(msg) {
  const elMsg = document.querySelector('.user-msg')
  elMsg.innerText = `${msg}`
  elMsg.classList.add('show')
  setTimeout(() => {
    elMsg.classList.remove('show')
  }, 2000)
}

function renderInlineInput() {
  const elInlineInput = document.querySelector('.inline-text-input')
  const { txt, x, y } = getCurrLine()

  elInlineInput.style.display = 'block'
  elInlineInput.value = txt
  elInlineInput.style.top = y - 40 + 'px'
  elInlineInput.style.left = x - FRAME_PAD + 'px'
  elInlineInput.select()
}

function hideInlineInput() {
  const elInlineInput = document.querySelector('.inline-text-input')
  elInlineInput.style.display = 'none'
}

function updateEditor() {
  const { txt, strokeColor, fillColor, family } = getCurrLine()

  const elFillIcon = document.querySelector('.fill-icon')
  elFillIcon.style.filter = `drop-shadow(1px 2px 0px ${fillColor})`

  const elBrushIcon = document.querySelector('.brush-icon')
  elBrushIcon.style.filter = `drop-shadow(1px 2px 0px ${strokeColor})`

  const elFontSelect = document.querySelector('.font-family-select')
  elFontSelect.value = family

  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = txt
}
