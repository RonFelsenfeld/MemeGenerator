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
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Enter your text',
      size: 20,
      color: 'red',
    },
  ],
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
