var myLibrary = [];

class Book {
    bookId;
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }

    getId() {
        if (!this.bookId) {
            this.bookId = crypto.randomUUID();
        }
    }

    toggleRead() {
        if (this.readStatus === true) {
        this.readStatus = false;
        } else {
            this.readStatus = true;
        }
    }
}

// Create Book using constructor and add it to myLibrary
function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    newBook.getId();
    myLibrary.push(newBook);
}

// Display the book on screen

addBookToLibrary('The Success Equation', 'Michael J. Mauboussin', 320, true);
addBookToLibrary('Madilog', 'Tan Malaka', 568, false);
addBookToLibrary('Personal Diary', 'You', 27, true);

const main = document.querySelector('main');

function displayBooks() {
    myLibrary.forEach((book) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const title = document.createElement('h2');
    title.classList.add('title')
    const author = document.createElement('p');
    author.classList.add('author');
    const pages = document.createElement('p');
    pages.classList.add('pages');
    const checkboxWrap = document.createElement('div');
    checkboxWrap.classList.add('checkboxWrap');
    const readStatus = document.createElement('input');
    readStatus.classList.add('readStatus');
    readStatus.type = 'checkbox';
    const labelReadStatus = document.createElement('label');

    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    if (book.readStatus === true) {
        readStatus.checked = true;
        labelReadStatus.textContent = `finished`;
    } else {
        readStatus.checked = false;
        labelReadStatus.textContent = `to read`;
    }

    main.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(checkboxWrap)
    checkboxWrap.appendChild(readStatus);
    checkboxWrap.appendChild(labelReadStatus);

    // remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent = 'x';
    card.appendChild(removeBtn);

    card.setAttribute('data-id', book.bookId);
})
}

displayBooks();

// Add Book Button
const showBtn = document.getElementById('addBook');
const dialog = document.getElementById('bookForm')
const bookForm = dialog.querySelector('form');
const confirmBtn = document.getElementById('confirmBtn');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readStatusInput = document.getElementById('readStatus');

showBtn.addEventListener('click', () => {
    dialog.showModal();
})


confirmBtn.addEventListener('click', event => {
    event.preventDefault();
    
    // Collect input data
    const title = titleInput.value.trim();
    const author = authorInput.value.trim() || 'someone';
    const pages = Number(pagesInput.value) || 0;
    const readStatus = readStatusInput.checked || false;
    // Add book to library if validation passes
    if (title) {
        addBookToLibrary(title, author, pages, readStatus);
    }
    // Reset form and close dialog
    bookForm.reset();
    dialog.close();

    // Refresh displayed books
    main.innerHTML = '';
    displayBooks();

});

// Remove Book Button\
main.addEventListener('click', e => {
    if (e.target.classList.contains('removeBtn')) {
        const newLibrary = myLibrary.filter(book => book.bookId !== e.target.parentElement.dataset.id);
        myLibrary = newLibrary;
        console.log(myLibrary)
        main.innerHTML = '';
        displayBooks();
    }
})

// Read Status Toggle
const card = document.getElementsByClassName('card');
const cardArr = Array.from(card);

main.addEventListener('click', e => {
    for (let index = 0; index < myLibrary.length; index++) {
        const element = myLibrary[index];
        if (e.target.classList.contains('readStatus') && e.target.parentElement.parentElement.dataset.id === element.bookId) {
            element.toggleRead();
            main.innerHTML = '';
            displayBooks();
        }
    }
})
