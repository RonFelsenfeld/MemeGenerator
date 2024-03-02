'use strict'

function renderSavedMemes() {
  hideNotSavedMsg()
  const elSavedMemes = document.querySelector('.saved-memes')

  const savedMemes = getSavedMemes()
  // If there are no saved memes --> show msg and hide savedMemes container
  if (!savedMemes || !savedMemes.length) {
    showNotSavedMsg()
    elSavedMemes.style.display = 'none'
    return
  }

  const strHTMLs = savedMemes.map(
    savedMeme =>
      `<div class="saved-meme flex align-center">
        <img src="${savedMeme.dataURL}" alt="Saved meme" onclick="onEditMeme('${savedMeme.id}')" />
        <span class="edit-msg">Edit</span>
        <div class="icons-container flex">
          <a href="#" title="Download" class="icon fa-solid fa-download" onclick="onDownloadSavedMeme(this, '${savedMeme.id}')" download="my-meme.jpg"></a>
          <button title="Delete "class="icon fa-solid fa-trash" onclick="onDeleteMeme('${savedMeme.id}')"></button>
        </div>
      </div>`
  )

  elSavedMemes.style.display = 'grid'
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
  if (memeToDownload === -1) return

  elLink.href = memeToDownload.dataURL
  showMsg('downloadMsg')
}

function onDeleteMeme(memeId) {
  deleteSaveMeme(memeId)
  renderSavedMemes()
  showMsg('deleteMsg')
}

////////////////////////////////////////////////////

function showNotSavedMsg() {
  const elMsg = document.querySelector('.no-saved-alert')
  elMsg.style.display = 'block'
}

function hideNotSavedMsg() {
  const elMsg = document.querySelector('.no-saved-alert')
  elMsg.style.display = 'none'
}
