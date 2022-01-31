
let booksURL = 'https://www.anapioficeandfire.com/api/books';

let modalWindow = document.querySelector('.modal-window');
let modalClose = document.querySelector('.modal-close');
let openBtn = document.querySelector('.btn');
let booksUL = document.querySelector('.book-list');
let charactersUL = document.querySelector('.characters');

function handleSpinner(rootElm, status=false) {
    if (status) {
        rootElm.innerHTML = `<div class="donut"></div>`;
    }
}

function displayCharacters(characters) {
    handleSpinner(charactersUL,true);
    Promise.all(characters.map(character => fetch(character).then(res => res.json())))
    .then((charactersData) => {
        charactersUL.innerHTML = '';
        charactersData.forEach(ch => {
            let li = document.createElement('li');
            li.innerText = `${ch.name} (${ch.aliases.join(' ')})`;
            charactersUL.append(li);
        })
    })
}

function displayBooks(data) {
    booksUL.innerHTML = '';
    data.forEach(book => {
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        h3.innerText = book.name;
        let p = document.createElement('p');
        p.innerText = book.authors.join(' ');
        let button = document.createElement('button');
        button.innerText = `Show Characters (${book.characters.length})`;
        button.addEventListener('click', () => {
            console.log('click');
            displayCharacters(book.characters);
            modalWindow.style.display = 'block';
            modalWindow.querySelector('.modal-close').addEventListener('click', () => {
            modalWindow.style.display = 'none';
            });
        })
        li.append(h3,p,button);
        booksUL.append(li);
    });
}

function fetchBooks() {
    handleSpinner(booksUL,true);
    fetch(booksURL)
    .then(res => res.json())
    .then((booksData) => displayBooks(booksData))
    .finally(() => handleSpinner(booksUL));
}

fetchBooks();


