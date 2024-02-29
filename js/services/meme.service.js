'use strict'

const SAVED_KEY = 'memesDB'

let gId = 1
const gIMGS = [
  { id: gId++, url: 'img/1.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/2.jpg', keywords: ['cute', 'animal'] },
  { id: gId++, url: 'img/3.jpg', keywords: ['cute'] },
  { id: gId++, url: 'img/4.jpg', keywords: ['cute, animal'] },
  { id: gId++, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
  { id: gId++, url: 'img/6.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/7.jpg', keywords: ['cute, baby'] },
  { id: gId++, url: 'img/8.jpg', keywords: ['smile'] },
  { id: gId++, url: 'img/9.jpg', keywords: ['smile', 'funny'] },
  { id: gId++, url: 'img/10.jpg', keywords: ['smile', 'men'] },
  { id: gId++, url: 'img/11.jpg', keywords: ['funny', 'men'] },
  { id: gId++, url: 'img/12.jpg', keywords: ['funny, men'] },
  { id: gId++, url: 'img/13.jpg', keywords: ['happy', 'men'] },
  { id: gId++, url: 'img/14.jpg', keywords: ['men'] },
  { id: gId++, url: 'img/15.jpg', keywords: ['funny'] },
  { id: gId++, url: 'img/16.jpg', keywords: ['smile', 'cute'] },
  { id: gId++, url: 'img/17.jpg', keywords: ['men'] },
  { id: gId++, url: 'img/18.jpg', keywords: ['cute'] },
]

const gSavesMemes = loadFromStorage(SAVED_KEY) || []
const gKeywordsSearchCountMap = {
  Funny: 0,
  Cute: 0,
  Animal: 0,
  Baby: 0,
  Smile: 0,
  Men: 0,
}

let gFilterBy = ''
let gIsDrag = false

let gMeme = {
  id: makeId(), // Will be the key when saving to storage
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [_createLine()],
}

////////////////////////////////////////////////////

function getMeme() {
  return gMeme
}

function getImgs() {
  if (!gFilterBy) return gIMGS
  return _filterImgs()
}

function getKeywords() {
  return gKeywordsSearchCountMap
}

function getSavedMemes() {
  return gSavesMemes
}

function setIsDragging(isDrag) {
  gIsDrag = isDrag
}

function isDragging() {
  return gIsDrag
}

////////////////////////////////////////////////////

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy.toLowerCase()
}

function editMeme(memeId) {
  const loadedMeme = gSavesMemes.find(savedMeme => savedMeme.meme.id === memeId)
  gMeme = loadedMeme.meme
}

function increaseKeywordCount(keyword) {
  if (gKeywordsSearchCountMap[keyword] === 20) return // Limit
  gKeywordsSearchCountMap[keyword]++
}

////////////////////////////////////////////////////

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

function dragLine({ x, y }) {
  const line = getCurrLine()
  line.x = x
  line.y = y
}

function moveLine(dir) {
  const line = getCurrLine()
  line.y += dir

  // Decided on purpose to give the option to get the line out of the canvas
  // Maybe the user wants to hide part of it
}

function saveMeme(dataURL) {
  const memeToSave = {
    meme: gMeme,
    url: dataURL,
  }

  // If the meme is already saved --> change it's url
  const previousVersion = gSavesMemes.find(
    savedMeme => savedMeme.meme.id === gMeme.id
  )
  if (previousVersion) previousVersion.url = dataURL
  // Else --> save a new meme
  else gSavesMemes.push(memeToSave)

  _saveMemeToStorage()
}

function addSticker(sticker) {
  const newLine = _createLine()
  newLine.txt = sticker
  newLine.width = 23 // Hard coded
  gMeme.lines.push(newLine)
}

////////////////////////////////////////////////////

function _createLine() {
  return {
    id: makeId(),
    txt: 'Enter your text',
    family: 'Impact',
    size: 20,
    color: 'black',
    x: 15,
    y: 15,
    width: 119.9609375, // Hard coded width off the current txt at the current size
  }
}

function _filterImgs() {
  const filteredImgs = gIMGS.filter(img => {
    const { keywords } = img
    return keywords.some(word => word.includes(gFilterBy))
  })

  return filteredImgs
}

function _saveMemeToStorage(meme) {
  saveToStorage(SAVED_KEY, gSavesMemes)
}
