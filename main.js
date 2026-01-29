const myLibrary = [];

// Book constructor 
function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.bookId;
}

Book.prototype.getId = function () {
        if (!this.bookId) {
            this.bookId = crypto.randomUUID();
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

    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`
    

    main.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);

    // remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    removeBtn.textContent = 'x';
    card.appendChild(removeBtn);

    card.dataset.id = book.bookId;
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
myLibrary.forEach((book) => {
})