'use strict'

let gMeme = {
  selectedImgId: 1,
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
