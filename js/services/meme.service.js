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
  selectedImgId: 1, // ! Reset to 0 after working
  selectedLineIdx: 0,
  lines: [_createLine()],
}

function getMeme() {
  return gMeme
}

function getImgs() {
  return IMGS
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function getCurrLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
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
}

function addLine() {
  const newLine = _createLine()
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1 // Setting the selectedLine to the last one (the new one)
}

function SetCurrLine(dir) {
  // If selectedLine is the last one && dir is positive (trying to go next line)
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1 && dir > 0) return

  gMeme.selectedLineIdx += dir
}

////////////////////////////////////////////////////

function _createLine() {
  return {
    txt: 'Enter your text',
    size: 20,
    color: 'black',
  }
}
