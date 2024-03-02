const gTrans = {
  appTitle: {
    en: 'Memerator',
    he: 'מימרייטור',
  },
  galleryLink: {
    en: 'Gallery',
    he: 'גלרייה',
  },
  savedMemeslink: {
    en: 'Saved Memes',
    he: 'השמורים שלי',
  },
  aboutLink: {
    en: 'About',
    he: 'אודות',
  },
  filterImgs: {
    en: 'Filter images',
    he: 'סנן תמונות',
  },
  clearBtn: {
    en: 'Clear',
    he: 'נקה',
  },
  Funny: {
    en: 'Funny',
    he: 'מצחיק',
  },
  Cute: {
    en: 'Cute',
    he: 'חמוד',
  },
  Animal: {
    en: 'Animal',
    he: 'חיות',
  },
  Baby: {
    en: 'Baby',
    he: 'תינוק',
  },
  Smile: {
    en: 'Smile',
    he: 'חיוך',
  },
  Men: {
    en: 'Men',
    he: 'גבר',
  },
  frenzyBtn: {
    en: 'Frenzy',
    he: 'השתולל',
  },
  enterTxt: {
    en: 'Enter your text',
    he: 'הקלד טקסט',
  },
  downloadBtn: {
    en: 'Download',
    he: 'הורדה',
  },
  saveBtn: {
    en: 'Save',
    he: 'שמור',
  },
  facebookBtn: {
    en: 'Share on Facebook',
    he: 'שתף בפייסבוק',
  },
  deleteMsg: {
    en: 'Line deleted',
    he: 'שורה נמחקה',
  },
  savedMsg: {
    en: 'Meme Saved',
    he: 'השמירה בוצעה',
  },
  downloadMsg: {
    en: 'Meme downloaded',
    he: 'ההורדה בוצעה',
  },
  deleteMsg: {
    en: 'Meme deleted',
    he: 'המחיקה בוצעה',
  },
  savedTitle: {
    en: 'Saved Memes',
    he: 'הממים שלי',
  },
  savedAlert: {
    en: 'No saved memes',
    he: 'אין ממים שמורים',
  },
  copyright: {
    en: 'Copyright © 2024 Ron Felsenfeld. All rights reserved',
    he: 'זכויות יוצרים © 2024 רון פלסנפלד. כל הזכויות שמורות',
  },
}

let gCurrLanguage = 'en'

function getTranslation(key, lang) {
  // If the key doesn't has translation --> return -1
  if (!gTrans[key]) return -1

  return gTrans[key][lang]
}

function getCurrLang() {
  return gCurrLanguage
}

function setCurrLang(lang) {
  gCurrLanguage = lang
}

function translatePage() {
  // Changes the page direction based on class
  document.body.classList.toggle('he')
  document.body.classList.toggle('en')

  // Changes the document title (Tab)
  document.title = getTranslation('appTitle', gCurrLanguage)

  const elsToTranslate = [...document.querySelectorAll('[data-trans]')]

  // For each element -->
  elsToTranslate.forEach(el => {
    // Get his translate keys
    const transKey = el.dataset.trans

    // Get his translation based on chosen language
    const trans = getTranslation(transKey, gCurrLanguage)

    // If el is an input --> Change it's placeholder
    if (el.nodeName === 'INPUT') {
      el.placeholder = trans
      return
    }

    // If el is the logo --> Change only the text and keep the yellow dot (a span)
    if (el.classList.contains('logo')) {
      el.childNodes[0].textContent = trans
      return
    }

    el.innerText = trans
  })
}
