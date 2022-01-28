// c4dgBRN_iDTy-gevrd_vDULPy_EFNfKcEZAjk1d5fPI
// https://api.unsplash.com/
// /photos/random
// /search/photos

const input = document.querySelector('input');
const root = document.querySelector('.images');

const url = `https://api.unsplash.com/photos/?client_id=c4dgBRN_iDTy-gevrd_vDULPy_EFNfKcEZAjk1d5fPI`

const getSearchUrl = (query) => `https://api.unsplash.com/search/photos?query=${query}&client_id=c4dgBRN_iDTy-gevrd_vDULPy_EFNfKcEZAjk1d5fPI`;

function fetch (url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => successHandler(JSON.parse(xhr.response))
    xhr.onerror = function () {
        console.log('Something Went Wrong...');
    } 
    xhr.send();
}

function displayImages (images) {
    root.innerHTML = '';
    images.forEach(image => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = image.urls.thumb;
        li.append(img);
        root.append(li);
    });
}

fetch(url,displayImages);

function handleSearch (event) {
    if (event.keyCode === 13 && input.value) {
        console.log(input.value);
        fetch(getSearchUrl(input.value), (searchResult) => {
            displayImages(searchResult.results);
        });
        input.value = '';
    }
}

input.addEventListener('keyup', handleSearch);

