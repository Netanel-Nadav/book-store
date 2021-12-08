'use strict'

const DEFAULT_LANG = 'en'
var gCurrLang = DEFAULT_LANG;
const PAGE_SIZE = 5;
const STORAGE_KEY = 'booksDB';
var gBooks;
var gPageIdx = 0;

_createBooks()


function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function prevPage() {
    gPageIdx--
    if (gPageIdx < 0) {
        gPageIdx = Math.ceil(gBooks.length / PAGE_SIZE -1);
    }
}


function _createBook(bookName, price = 50) {
    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        rating: getRandomIntInclusive(0, 10),
        text: makeLorem(50)
    }
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 5; i++) {
            books.push(_createBook('Harry Potter', 30, 'blahBlah'))
            books.push(_createBook('Dan Arieli', 13, 'Jimmini'))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function getBooks() {
    var books = getGBooks();
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books;
}

function getGBooks() {
    return gBooks
}

function getBookById(bookId) {
    const book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

function getBookIdxByDescription(rating) {
    return gBooks.findIndex(book => book.rating === rating)
}

function removeBook(bookId) {
    const book = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    gBooks.splice(book, 1);
    _saveBooksToStorage()
}


function addBook(bookName, bookPrice) {
    gBooks.push(_createBook(bookName, bookPrice));
    _saveBooksToStorage('booksDB', gBooks)
}

function updateBook(bookId, newPrice) {
    if (!newPrice || newPrice < 0) return
    const idx = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    gBooks[idx].price = newPrice;
    _saveBooksToStorage();
}


function sortBooks(sortBy) {
    gBooks.sort((a, b) => {
        if (sortBy === 'Title') {
            if (a.bookName < b.bookName) return -1
            if (a.bookName > b.bookName) return 1
            return 0
        } else if (sortBy === 'Price') return a.price - b.price
        else return a.rating - b.rating
    });
}

function setLang(lang) {
    gCurrLang = lang;
}