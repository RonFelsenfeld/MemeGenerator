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
}

let gCurrLanguage = 'en'

function getTranslation(key, lang) {
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
  document.body.className = gCurrLanguage

  const elsToTranslate = [...document.querySelectorAll('[data-trans]')]

  // For each element -->
  elsToTranslate.forEach(el => {
    // Get his translate keys
    const transKey = el.dataset.trans

    // Get his translation based on chosen language
    const trans = getTranslation(transKey, gCurrLanguage)

    switch (el.nodeName) {
      case 'INPUT':
        el.placeholder = trans
        break
      case 'OPTION':
      // el.value = trans
      default:
        el.innerText = trans
        break
    }
  })
}
