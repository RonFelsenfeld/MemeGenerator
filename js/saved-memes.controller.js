'use strict'

function renderSavedMemes() {
  const savedMemes = getSavedMemes()

  const strHTMLs = savedMemes.map(
    savedMeme =>
      `<div class="saved-meme flex">
        <img src="${savedMeme.dataURL}" alt="Saved meme" onclick="onEditMeme('${savedMeme.id}')" />
        <div class="icons-container flex">
          <a href="#" class="icon fa-solid fa-download" onclick="onDownloadSavedMeme(this, '${savedMeme.id}')" download="my-meme.jpg"></a>
          <button class="icon fa-solid fa-trash" onclick="onDeleteMeme('${savedMeme.id}')"></button>
        </div>
      </div>`
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

function onDownloadSavedMeme(elLink, memeId) {
  const savedMemes = getSavedMemes()
  const memeToDownload = savedMemes.find(meme => meme.id === memeId)

  if (memeToDownload !== 1) {
    elLink.href = memeToDownload.dataURL
    showMsg('downloadMsg')
  }
}

function onDeleteMeme(memeId) {
  console.log(memeId)
}
