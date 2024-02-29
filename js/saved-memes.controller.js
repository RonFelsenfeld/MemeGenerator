'use strict'

function renderSavedMemes() {
  const savedMemes = getSavedMemes()

  const strHTMLs = savedMemes.map(
    savedMeme =>
      `<img src="${savedMeme.url}" alt="Saved meme" class="saved-meme" onclick="onEditMeme('${savedMeme.meme.id}')" />`
  )

  const elSavedMemes = document.querySelector('.saved-memes')
  elSavedMemes.innerHTML = strHTMLs.join('')
}

function onEditMeme(memeId) {
  hideSavedMemes()
  showEditor()
  editMeme(memeId)
  renderMeme()
}
