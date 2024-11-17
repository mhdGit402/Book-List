class Books {
  constructor(id, title, author, isbn) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.http = new HTTP("https://retoolapi.dev/IXAI11/data");
  }

  validateBook() {
    if (!this.title || !this.author || !this.isbn) {
      return false;
    } else {
      return true;
    }
  }

  addBook() {
    const book = {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
    };

    this.saveBook(book).then((response) => {
      if (response) {
        document.querySelectorAll(".books-info").forEach((e) => {
          e.remove();
        });
        this.statusBook("New Book Added!", "valid-book");
        this.loadBook();
      } else {
        this.statusBook("Cannot save book!", "invalid-book");
      }
    });
  }

  saveBook(book) {
    return this.http
      .post(book)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadBook() {
    this.http
      .get()
      .then((response) => {
        this.showBook(response);
      })
      .catch((err) => console.log(err));
  }

  showBook(book) {
    const showBooksUL = document.querySelector(".show-books");
    let ul;
    for (const property in book) {
      ul = document.createElement("ul");
      ul.setAttribute("class", "books-info");
      ul.setAttribute("id", `book${book[property].id}`);
      ul.innerHTML = `<li id="book-title">${book[property].title}</li>
      <li id="book-author">${book[property].author}</li>
      <li id="book-isbn">${book[property].isbn}</li>
      <li><a href="#" id=delete-book${book[property].id}>Delete</li>`;
      showBooksUL.append(ul);
    }
    bookCount = book.length;
  }

  deleteBook(id) {
    document.querySelector(`#${id}`).remove();
    // From dataStore
  }

  statusBook(statusText, statusClass) {
    const validate = document.querySelector("#validate-form");
    validate.textContent = statusText;
    validate.classList.add(statusClass);
    setTimeout(() => {
      validate.textContent = "";
      validate.classList.remove(statusClass);
    }, 3000);
  }
}

const title = document.querySelector("#bookTitle");
const author = document.querySelector("#bookAuthor");
const isbn = document.querySelector("#bookISBN");
const deleteBook = document.querySelector(".show-books");
let books;
let bookCount;

const addBook = document
  .querySelector("form#add-book-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    books = new Books(bookCount + 1, title.value, author.value, isbn.value);
    if (books.validateBook()) {
      books.addBook();
    } else {
      books.statusBook("Fill up form!", "invalid-book");
    }
  });

deleteBook.addEventListener("click", (e) => {
  if (e.target.id.includes("delete-book")) {
    books = new Books();
    const bookID = e.target.id.split("-")[1];
    books.deleteBook(bookID);
    books.statusBook("Book Deleted!", "deleted-book");
  }
});

// Retrive and show books from dataStore with iife
(() => {
  const showBooks = new Books();
  showBooks.loadBook();
})();
