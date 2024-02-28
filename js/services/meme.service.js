'use strict'

let gId = 1
const IMGS = [
  { id: gId++, url: 'img/1.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
  { id: gId++, url: 'img/3.jpg', keywords: ['cute', 'funny'] },
  { id: gId++, url: 'img/4.jpg', keywords: ['cat'] },
  { id: gId++, url: 'img/5.jpg', keywords: ['cute', 'funny'] },
  { id: gId++, url: 'img/6.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/7.jpg', keywords: ['sad'] },
  { id: gId++, url: 'img/8.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/9.jpg', keywords: ['sad'] },
  { id: gId++, url: 'img/10.jpg', keywords: ['happy'] },
  { id: gId++, url: 'img/11.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/12.jpg', keywords: ['sad'] },
  { id: gId++, url: 'img/13.jpg', keywords: ['happy'] },
  { id: gId++, url: 'img/14.jpg', keywords: ['happy', 'funny'] },
  { id: gId++, url: 'img/15.jpg', keywords: ['serious'] },
  { id: gId++, url: 'img/16.jpg', keywords: ['happy'] },
  { id: gId++, url: 'img/17.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/18.jpg', keywords: ['sad'] },
]

let gMeme = {
  id: makeId(),
  selectedImgId: 1, // ! Change to 0
  selectedLineIdx: 0,
  lines: [_createLine()],
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return IMGS
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

// Works on direction (next/previous)
function switchLine(dir) {
  // If selectedLine is the last one && dir is positive (trying to go next line)
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1 && dir > 0) return

  // If selectedLine is the first one && dir is negative (trying to go prev line)
  if (gMeme.selectedLineIdx === 0 && dir < 0) return

  gMeme.selectedLineIdx += dir
}

// Works on direct click on line
function setCurrLine(lineId) {
  const { lines } = getMeme()

  const lineIdx = lines.findIndex(line => line.id === lineId)
  gMeme.selectedLineIdx = lineIdx
}

function addLine() {
  const newLine = _createLine()
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1 // Setting the selectedLine to the last one (the new one)
}

function removeLine() {
  const { lines } = getMeme()
  const { id } = getCurrLine()

  const lineIdx = gMeme.lines.findIndex(line => line.id === id)
  if (lineIdx !== -1) gMeme.lines.splice(lineIdx, 1)

  gMeme.selectedLineIdx = 0
}

function setLineTxt(txt) {
  const line = getCurrLine()
  line.txt = txt
}

function setLineColor(color) {
  const line = getCurrLine()
  line.color = color
}

function increaseTextSize() {
  const line = getCurrLine()
  line.size++
}

function decreaseTextSize() {
  const line = getCurrLine()
  line.size--
  if (line.size < 1) line.size = 1
}

function setLineWidth(newWidth) {
  const line = getCurrLine()
  line.width = +newWidth
}

function setFontFamily(family) {
  const line = getCurrLine()
  line.family = family
}

function setLineAlignment(posX) {
  const line = getCurrLine()
  line.x = posX
}

function moveLine(dir) {
  const line = getCurrLine()
  line.y += dir

  // Decided on purpose to give the option to get the line out of the canvas
  // Maybe the user wants to hide part of it
}

function saveMeme() {
  _saveMemeToStorage()
}

////////////////////////////////////////////////////

function _createLine() {
  return {
    id: makeId(),
    txt: 'Enter your text',
    family: 'Impact',
    size: 20,
    color: 'black',
    x: 0,
    y: 0,
    width: 119.9609375,
  }
}

function _saveMemeToStorage() {
  saveToStorage(gMeme.id, gMeme)
}
