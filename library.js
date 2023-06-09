"use strict";

let myLibrary = [];


class Book {
  constructor(title, author, pages, read_status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
  }

  info() {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages " +
      ", " +
      this.read_status
    );
  }
}

class Library {
  constructor(title, author, pages, read_status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_status = read_status;
  }

  addBook() {
    const b_obj = new Book(
      this.title,
      this.author,
      this.pages,
      this.read_status
    );
    //const b_obj=new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
    myLibrary.push(b_obj);
    console.log("book added");
    const jsonMyLib = JSON.stringify(myLibrary);
    localStorage.setItem('myLibrary',jsonMyLib);
    // console.log(localStorage["myLibrary"]);
  }

  displayBook() {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookTitle = document.createElement("p");
    bookTitle.setAttribute("class", "book-name");
    bookTitle.textContent = this.title;
    bookDiv.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = this.author;
    bookDiv.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.textContent = `${this.pages} pages`;
    bookDiv.appendChild(bookPages);

    const readBtn = document.createElement("button");

    if (this.read_status) {
      readBtn.textContent = "Completed";
      readBtn.classList.add("btn-read-status-y");
    } else {
      readBtn.textContent = "Not read yet";
      readBtn.classList.add("btn-read-status-n");
    }
    bookDiv.appendChild(readBtn);

    const removeBtn = document.createElement("button");

    removeBtn.innerHTML =
      '<span class="material-symbols-outlined">delete</span> Remove';
    // removeBtn.textContent = "Remove";
    removeBtn.classList.add("btn-remove");
    bookDiv.appendChild(removeBtn);
    bookDiv.setAttribute("data-index", myLibrary.length);

    const shelf = document.querySelector(".shelf");
    shelf.appendChild(bookDiv);

    //Attaching event listener to each remove button
    removeBtn.addEventListener("click", (e) => {
      const bookIndex = bookDiv.getAttribute("data-index") - 1;
      //removing from the myLibrary
      myLibrary.splice(bookIndex, 1);

      //removing from the parent shelf
      removeBtn.parentElement.remove();
      const jsonMyLib = JSON.stringify(myLibrary);
      localStorage.setItem('myLibrary',jsonMyLib);
      console.log("removed book at index " + bookIndex);
    });

    readBtn.addEventListener("click", (e) => {
      const bookIndex = bookDiv.getAttribute("data-index") - 1;

      //if read status is yes
      if (myLibrary[bookIndex].read_status) {
        myLibrary[bookIndex].read_status = null;
        readBtn.textContent = "Not read yet";
        readBtn.classList.remove("btn-read-status-y");
        readBtn.classList.add("btn-read-status-n");
      } else {
        myLibrary[bookIndex].read_status = "on";
        readBtn.textContent = "Completed";
        readBtn.classList.remove("btn-read-status-n");
        readBtn.classList.add("btn-read-status-y");
      }

      const jsonMyLib = JSON.stringify(myLibrary);
      // console.log(jsonMyLib);
      localStorage.setItem('myLibrary',jsonMyLib);

    });
  }

}

// capturing form data
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  let title = formData.get("title");
  let author = formData.get("author");
  let pages = formData.get("pages");
  let read_status = formData.get("read_status");

  let l_obj = new Library(title, author, pages, read_status);
  //addBookToLibrary(title, author, pages, read_status);
  l_obj.addBook();
  l_obj.displayBook();


  form.reset();
});


function displayShelf(){
  
  const jsonMyLib = localStorage["myLibrary"];
  //console.log("Reached json stage of displayShelf")

  if(jsonMyLib){
    console.log("Reached valid stage of displayShelf");
    //returns myLibrary array which has book objects
    const shelf = JSON.parse(jsonMyLib);
    for (let book of shelf){

      let l_obj = new Library(book.title, book.author, book.pages, book.read_status);
      l_obj.addBook();
      l_obj.displayBook();

    }

  }
  
}

displayShelf();
