'use strict'

function renderGallery() {
  const imgs = getImgs()

  const strHTMLs = imgs.map(
    img => `<img src="img/${img.id}.jpg" alt="img${img.id}" />`
  )

  const elGallery = document.querySelector('.gallery')
  elGallery.innerHTML = strHTMLs.join('')
}
