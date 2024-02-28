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
    gCtx.font = `${line.size}px Ariel`
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
  const { txt, size } = getCurrLine()

  gCtx.font = `${size}px Ariel`
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
