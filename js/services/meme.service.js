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

const gSavedMemes = loadFromStorage(SAVED_KEY) || []
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

let gMeme

////////////////////////////////////////////////////

// Meme gets created after img is selected (Need to reset it after returning to the gallery)
function createMeme() {
  gMeme = {
    id: makeId(), // Will be the key when saving to storage
    selectedImgId: 0,
    selectedLineIdx: 0,
    dataURL: '',
    lines: [_createLine()],
  }
}

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
  return gSavedMemes
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

function setDataURL(dataURL) {
  gMeme.dataURL = dataURL
}

function getDataURL() {
  return gMeme.dataURL
}

function editMeme(memeId) {
  const loadedMeme = gSavedMemes.find(savedMeme => savedMeme.id === memeId)
  gMeme = loadedMeme
}

function increaseKeywordCount(keyword) {
  // In case the user input a keywords that don't exist
  if (gKeywordsSearchCountMap[keyword] === undefined) return

  if (gKeywordsSearchCountMap[keyword] === 15) return // Limit
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

function addLine(height) {
  const newLine = _createLine()

  // If it's the second line --> Align it at the end of the canvas
  if (gMeme.lines.length === 1) newLine.y = height - newLine.size
  // If the third+ line --> Align it at the middle of the canvas
  else newLine.y = height / 2

  gMeme.lines.push(newLine)

  // Setting the selectedLine to the last one (the new one)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
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

function setLineStrokeColor(color) {
  const line = getCurrLine()
  line.strokeColor = color
}

function setLineFillColor(color) {
  const line = getCurrLine()
  line.fillColor = color
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

function setLinePos(deltaX, deltaY) {
  const line = getCurrLine()
  line.x += deltaX
  line.y += deltaY
}

function moveLine(dir) {
  const line = getCurrLine()
  line.y += dir

  // Decided on purpose to give the option to get the line out of the canvas
  // Maybe the user wants to hide part of it
}

function saveMeme() {
  const previousVersion = gSavedMemes.find(
    savedMeme => savedMeme.id === gMeme.id
  )

  // If the meme is already saved --> change it's url
  if (previousVersion) previousVersion.dataURL = getDataURL()
  // Else --> save a new meme
  else gSavedMemes.push(gMeme)

  _saveMemesToStorage()
}

function deleteSaveMeme(memeId) {
  const memeIdx = gSavedMemes.findIndex(meme => meme.id === memeId)
  if (memeIdx === -1) return

  gSavedMemes.splice(memeIdx, 1)
  _saveMemesToStorage()
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
    txt: getTranslation('enterTxt', getCurrLang()),
    family: 'Impact',
    size: 20,
    strokeColor: 'black',
    fillColor: 'white',
    width: 119.9609375,
    x: 250 - 119.9609375 / 2,
    y: 10,
    // The width is hard coded value after calculation
    // X defined as canvasWidth/2 - lineWidth/2 (centering the line)
  }
}

function _filterImgs() {
  const filteredImgs = gIMGS.filter(img => {
    const { keywords } = img

    // Create an array of all keywords translated to the curr lang
    const transKeywords = keywords.map(keyword => {
      // Capitalizing keyword (because it's saved capitalized in gTrans)
      const capitalizeKeyword =
        keyword.charAt(0).toUpperCase() + keyword.slice(1)

      // Translating keyword
      let transKeyword = getTranslation(capitalizeKeyword, getCurrLang())

      // If the keyword is not translatable --> define as ''
      if (transKeyword === -1) transKeyword = ''
      return transKeyword
    })

    return transKeywords.some(word => word.toLowerCase().includes(gFilterBy))
  })

  return filteredImgs
}

function _saveMemesToStorage() {
  saveToStorage(SAVED_KEY, gSavedMemes)
}
