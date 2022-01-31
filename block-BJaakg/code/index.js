const sourceURL = `https://www.anapioficeandfire.com/api/books`;

let ul = document.querySelector('ul');
let pop = document.querySelector('.pop-up');

function handleCharacters(characters) {
    console.log(characters);
    characters.forEach((url) => {
        let li = document.createElement('li');
        let name = fetch(url).then(res => res.json()).then(ch => ch.name);
        name.then(nam => li.append(nam));
        pop.style.display = 'block';
        pop.append(li);
    })
}

function displayUI(data) {
    console.log(data)
    data.forEach(book => {
        let li = document.createElement('li');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        let button = document.createElement('button');
        h2.innerText = book.name;
        p.innerText = book.authors[0];
        button.innerText = `Show Characters ${book.characters.length}`
        button.addEventListener('click', () => handleCharacters(book.characters));
        li.append(h2,p,button);
        ul.append(li);
    });
}

fetch(sourceURL).then(data=> data.json()).then(data => displayUI(data))