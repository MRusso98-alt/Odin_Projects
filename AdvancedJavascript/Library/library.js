function Book(title, author, pages, readStatus){
    if(!new.target){
        throw Error("Error! This can only be called using the new keyword.")
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function(){
        return (this.title + " by " + this.author + ", " + this.pages + " pages, " + this.readStatus + ".");
    }
    this.changeStatus = function(){
        if(this.readStatus === "read") this.readStatus = "not read";
        else this.readStatus = "read";
    }
}

function addListeners(remove, change){
    remove.addEventListener("click", function(){
        const book = remove.parentNode.parentNode;
        const id = book.getAttribute("id");
        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id === id)
                myLibrary.splice(i, 1);
        }
        showBooks();
    });

    change.addEventListener("click", function(){
        const book = remove.parentNode.parentNode;
        const id = book.getAttribute("id");
        for(let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id === id){
                myLibrary[i].changeStatus();
            }
        }
        showBooks();
    });
}

function addToLibrary(title, author, pages, readStatus){
    const book = new Book(title, author, pages, readStatus);
    myLibrary.push(book);
    showBooks();
}

function removeBooks(){
    const container = document.querySelector(".book-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function showBooks(){
    const container = document.querySelector(".book-container");
    removeBooks();
    myLibrary.forEach(element => {
        const book = document.createElement("div");
        book.setAttribute("id", element.id);
        const img = document.createElement("img");
        img.setAttribute("src", "./icon/book.svg");
        const info = document.createElement("h3");
        info.textContent = "Name: " + element.title + " by " + element.author;
        const pages = document.createElement("h3");
        pages.textContent = "Pages: " + element.pages;
        const read = document.createElement("h3");
        read.textContent = "Status: " + element.readStatus;
        book.appendChild(img);
        
        const text = document.createElement("div");
        text.setAttribute("class", "book-info");
        text.appendChild(info);
        text.appendChild(pages);
        text.appendChild(read);
        book.appendChild(text);

        const buttons = document.createElement("div");
        buttons.setAttribute("class", "buttons");
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "remove-button");
        removeButton.textContent = "Remove";
        const changeStatus = document.createElement("button");
        changeStatus.setAttribute("class", "change-status-button");
        changeStatus.textContent = "R <=> NR";
        buttons.appendChild(removeButton);
        buttons.appendChild(changeStatus);
        book.appendChild(buttons);

        addListeners(removeButton, changeStatus);

        book.setAttribute("class", "book");
        container.appendChild(book);
    })
}

const addButton = document.querySelector(".header button");
addButton.addEventListener("click", function(){
    const dialog = document.querySelector("dialog");
    dialog.showModal();
});

const closeButton = document.querySelector("form button")
closeButton.addEventListener("click", function(e){
    e.preventDefault();
    const dialog = document.querySelector("dialog");
    const title = document.querySelector("form #title");
    const author = document.querySelector("form #author");
    const pages = document.querySelector("form #pages");
    const readStatus = document.querySelector("form #read");
    
    if(title.validity.valid && author.validity.valid && pages.validity.valid && readStatus.validity.valid){
        addToLibrary(title.value, author.value, pages.value, readStatus.value);
        title.value = "";
        author.value = "";
        pages.value = "";
        readStatus.value = "";
        dialog.close();
    } else {
        title.setAttribute("style", "border: 1px solid black");
        author.setAttribute("style", "border: 1px solid black");
        pages.setAttribute("style", "border: 1px solid black");
        readStatus.setAttribute("style", "border: 1px solid black");
        if(!title.validity.valid){
            title.setAttribute("style", "border: 2px solid red");
        }
        if(!author.validity.valid){
            author.setAttribute("style", "border: 2px solid red");
        }
        if(!pages.validity.valid){
            pages.setAttribute("style", "border: 2px solid red");
        }
        if(!readStatus.validity.valid){
            readStatus.setAttribute("style", "border: 2px solid red");
        }
    }
});


const myLibrary = [];
addToLibrary("A", "B", 150, "not read");
addToLibrary("B", "C", 100, "not read");