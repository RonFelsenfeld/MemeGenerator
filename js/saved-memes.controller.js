'use strict'

function renderSavedMemes() {
  const savedMemes = getSavedMemes()

  const strHTMLs = savedMemes.map(
    meme =>
      `<img src="${meme.url}" alt="Saved meme" class="saved-meme" onclick="onEditMeme('${meme.id}')" />`
  )

  const elSavedMemes = document.querySelector('.saved-memes')
  elSavedMemes.innerHTML = strHTMLs.join('')
}

function onEditMeme(memeId) {
  hideSavedMemes()
  showEditor()
  editMeme(memeId)
}
