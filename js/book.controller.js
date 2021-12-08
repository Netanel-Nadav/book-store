'use strict'

function onInit() {
    renderBooks();
}


function renderBooks() {
    const books = getBooks();
    const strHtmls = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.bookName}</td>
        <td>${book.price} <span data-trans="currency">$</span></td>
        <td>${book.rating}</td>
        <td> <button class="read" onclick="onReadBook('${book.id}')"><span data-trans="book-read">Read</span></button></td>
        <td><input type="number" placeholder="New Price" min="0" max="10" class="new-price-${book.id}"></input><button onclick="onUpdateBook('${book.id}')"><span data-trans="book-update-price">Update</span></button></td>
        <td><button class="delete" onclick="onRemoveBook('${book.id}')"><span data-trans="book-delete">Delete</span></button></td>
        </tr>`
    })
    document.querySelector('.table-render').innerHTML = strHtmls.join('');
    doTrans()
}


function onReadBook(bookId) {
    const book = getBookById(bookId)
    renderModal(book);
    var elModal = document.querySelector('.modal')
    elModal.classList.add('open');
}

function onSetRating(val, bookId) {
    var book = getBookById(bookId)
    if (book.rating <= 0 && val === -1) return
    if (book.rating >= 10 && val === 1) return
    var book = getBookById(bookId)
    var elSpan = document.querySelector('.curr-rating');
    book.rating += val;
    elSpan.innerText = book.rating;
    renderBooks();
}



function renderModal(book) {
    var strHTML = `<div class="modal">
    <button class="close-modal" onclick="onCloseModal()">X</button>
    <h3>${book.bookName}</h3>
    <h5>${book.price}</h5>
    <p class="lorem">${book.text}</p>

    <button class="decrease-rating" onclick="onSetRating(-1, '${book.id}')">-</button>
    <span class="curr-rating">${book.rating}</span>
    <button class="increace-rating" onclick="onSetRating(1, '${book.id}')">+</button>
    </div>
    `
    document.querySelector('.modal-injection').innerHTML = strHTML;
}


function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open');
}

function onAddBook() {
    var bookName = prompt('Book name please');
    var bookPrice = +prompt('Book Price please');
    addBook(bookName, bookPrice);
    renderBooks();
}

function onUpdateBook(bookId) {
    // var newPrice = prompt('what is the New price?');
    const newPrice = document.querySelector(`.new-price-${bookId}`).value
    console.log(newPrice);
    updateBook(bookId, newPrice);
    renderBooks();
}


function onSortBooks(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}

function onPrevPage() {
    prevPage();
    renderBooks();
}

function onNextPage() {
    nextPage();
    renderBooks();
}


function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    renderBooks();
}