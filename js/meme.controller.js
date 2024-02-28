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

  lines.forEach(line => {
    gCtx.font = `${line.size}px ${line.family}`
    gCtx.fillStyle = `${line.color}`
    gCtx.textAlign = 'left'
    gCtx.textBaseline = 'top'

    gCtx.fillText(line.txt, line.x, line.y)
  })
}

function onTextInput(txt) {
  setLineTxt(txt)

  const lineWidth = calcLineWidth()
  setLineWidth(lineWidth)

  renderMeme()
}

function onChangeColor(color) {
  setLineColor(color)
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
  onClearInput()
  renderMeme()
}

function onSetCurrLine({ dir }) {
  switchLine(+dir)
  renderMeme()
}

function onCanvasClicked(ev) {
  const { offsetX, offsetY } = ev

  const { lines } = getMeme()
  const selectedLine = lines.find(line => {
    const { x, y, width, size } = line

    const isInXRange =
      offsetX >= x - FRAME_PAD && offsetX <= x + width + FRAME_PAD
    const isInYRange =
      offsetY >= y - FRAME_PAD && offsetY <= y + size + FRAME_PAD

    return isInXRange && isInYRange
  })

  if (selectedLine) setCurrLine(selectedLine.id)
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

////////////////////////////////////////////////////

function getAlignmentPos(alignment) {
  let pos

  switch (alignment) {
    case 'left':
      // If left --> stick to the left + FRAME_PAD
      pos = 0 + FRAME_PAD
      break
    case 'center':
      pos = calcAlignmentCenter()
      break
    case 'right':
      pos = calcAlignmentRight()
      break
  }

  return pos
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

function highlightCurrLine() {
  const line = getCurrLine()
  const { x, y, size, width } = line
  gCtx.beginPath()
  gCtx.lineWidth = 3

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

function onDownloadMeme(elLink) {
  const content = gElCanvas.toDataURL('image/jpeg')
  elLink.href = content
}

function onClearInput() {
  const elTextInput = document.querySelector('.text-input')
  elTextInput.value = ''
}
