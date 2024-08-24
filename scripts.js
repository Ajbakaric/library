const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleRead(${index})">Toggle Read</button>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

document.getElementById('new-book-button').addEventListener('click', () => {
    document.getElementById('book-form-container').style.display = 'block';
});

document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Retrieve form input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Simple validation to check if all fields are filled
    if (title === '' || author === '' || pages === '') {
        // Show error message if any field is empty
        document.getElementById('error-message').style.display = 'block';
        return;
    } else {
        // Hide error message if form is valid
        document.getElementById('error-message').style.display = 'none';
    }

    // Create a new book object and add it to the library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Reset the form and hide it
    document.getElementById('book-form').reset();
    document.getElementById('book-form-container').style.display = 'none';
});

// Initial call to display books
displayBooks();
