'use strict'

// const DEFAULT_LANG = 'en'
// var gCurrLang = DEFAULT_LANG;


var gTrans = {
    UNKNOWN: {
        en: 'UNKNOWN',
        he: 'לא הוגדר',
    },
    'page-title': {
        en: 'Welcome to my Book Shop',
        he: 'ברוכים הבאים לחנות הספרים שלי',
    },
    'new-book': {
        en: 'Create New Book',
        he: 'צור ספר חדש'
    },
    'book-title': {
        en: 'Title',
        he: 'כותרת',
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'book-rating': {
        en: 'Rating',
        he: 'איכות'
    },
    'book-action': {
        en: 'Action',
        he: 'פעולות',
    },
    'prev-page': {
        en: 'Previous',
        he: 'אחורה',
    },
    'next-page': {
        en: 'Next',
        he: 'קדימה',
    },
    'book-read': {
        en: 'Read More',
        he: 'קרא עוד',
    },
    'book-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'book-update-price': {
        en: 'Update Price',
        he: 'עדכן מחיר',
    },
    'new-price': {
        en: 'New Price',
        he: 'מחיר חדש',
    },
    currency: {
        en: '$',
        he: '₪',
    }
}

function getTrans(transKey){
    const tranLangsMap = gTrans[transKey]
    if (!tranLangsMap) return gTrans['UNKNOWN'][gCurrLang]

    const word = tranLangsMap[gCurrLang]
    if (!word) return tranLangsMap[DEFAULT_LANG]
    return word;
}


function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        if (el.nodeName === 'INPUT') { 
            el.placeholder = getTrans(transKey)
        } else {
            el.innerText = getTrans(transKey)
        }
    })
}