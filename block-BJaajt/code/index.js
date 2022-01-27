let input = document.querySelector('input');
let userImg = document.querySelector('.userPhoto');
let userName = document.querySelector('.userName');
let userLink = document.querySelector('.userLink');
let catImg = document.querySelector('.catImg');
let catBtn = document.querySelector('.catBtn');

function displayUI(data) {
    userImg.src = data.avatar_url;
    userName.innerText = data.name;
    userLink.innerText = `@${data.login}`;
}

function handleChange(event) {
    if (event.keyCode === 13) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET',`https://api.github.com/users/${event.target.value}`);
        xhr.onload = function () {
            let userData = JSON.parse(xhr.response);
            displayUI(userData);
        };
        xhr.send();
        event.target.value = '';
    }
}

input.addEventListener('keyup', handleChange);

function handleImage(event) {
    let xhr2 = new XMLHttpRequest();
    xhr2.open('GET','https://api.thecatapi.com/v1/images/search?limit=1&size=full');
    xhr2.onload = function () {
        let imageData = JSON.parse(xhr2.response);
        catImg.src = imageData[0].url;
    }
    xhr2.send();
}

catBtn.addEventListener('click', handleImage);

