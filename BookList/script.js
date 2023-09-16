const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookNote = document.querySelector("#note");
const bookList = document.querySelector("#book-list");
const btn = document.querySelector("#add-book");

function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  container.insertBefore(div, form);

  // Vanish in 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

const books = JSON.parse(localStorage.getItem("books")) || [];

for (let i = 0; i < books.length; i++) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${books[i].title}</td>
    <td>${books[i].author}</td>
    <td>${books[i].note}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
  `;
  bookList.appendChild(row);
}

const addBook = (title, author, note) => {
  books.push({
    title,
    author,
    note,
  });

  localStorage.setItem("books", JSON.stringify(books));

  return { title, author, note };
};

function removeBook(note) {
  books.forEach((book, i) => {
    if (book.note === note) {
      books.splice(i, 1);
    }
    console.log("bravo");
  });
  localStorage.setItem("books", JSON.stringify(books));
  console.log("bravo");
}

const creatBook = btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (bookTitle.value == "" && bookAuthor.value == "" && bookNote.value == "") {
    showMessage("Adauga o carte", "danger");
  } else {
    const row = document.createElement("tr");
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const note = bookNote.value;
    row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${note}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
    bookList.appendChild(row);
    addBook(title, author, note);
  }
  function clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#note").value = "";
  }
  clearFields();
});

function deleteBook(el) {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.remove();
  }
}
bookList.addEventListener("click", (e) => {
  deleteBook(e.target);

  showMessage("Carte Stearsa", "success");

  removeBook(e.target.parentElement.previousElementSibling.textContent);
});
