class Books {
  constructor(id, title, author, isbn) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  validateBook(title, author, isbn) {
    if (!title || !author || !isbn) {
      return false;
    } else {
      return true;
    }
  }

  addBook(id, title, author, isbn) {
    const book = {
      title: title,
      author: author,
      isbn: isbn,
    };
    const showBooks = document.querySelector(".show-books");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "books-info");
    ul.setAttribute("id", `book${id}`);
    Object.entries(book).forEach(([_, value]) => {
      ul.innerHTML += `<li>${value}</li>`;
    });
    ul.innerHTML += `<li><a href="#" id=delete-book${id}>Delete</li>`;
    showBooks.append(ul);
  }

  deleteBook(id) {
    document.querySelector(`#${id}`).remove();
  }

  statusBook(status) {
    let statusText;
    let statusClass;
    if (status === 0) {
      statusText = "Fill up form!";
      statusClass = "invalid-book";
    } else if (status === 1) {
      statusText = "New Book Added!";
      statusClass = "valid-book";
    } else if (status === 2) {
      statusText = "Book Deleted!";
      statusClass = "deleted-book";
    }
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

const books = new Books();

const addBook = document
  .querySelector("form#add-book-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const bookCount = document.querySelector(".show-books").childElementCount;
    if (books.validateBook(title.value, author.value, isbn.value)) {
      books.addBook(bookCount, title.value, author.value, isbn.value);
      books.statusBook(1);
    } else {
      books.statusBook(0);
    }
  });

deleteBook.addEventListener("click", (e) => {
  if (e.target.id.includes("delete-book")) {
    const bookID = e.target.id.split("-")[1];
    books.deleteBook(bookID);
    books.statusBook(2);
  }
});
