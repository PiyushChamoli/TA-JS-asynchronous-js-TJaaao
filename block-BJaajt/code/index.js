let input = document.querySelector('input');
let userImg = document.querySelector('.userPhoto');
let userName = document.querySelector('.userName');
let userLink = document.querySelector('.userLink');
let catImg = document.querySelector('.catImg');
let catBtn = document.querySelector('.catBtn');
let followersUL = document.querySelector('.followers');
let followingUL = document.querySelector('.following');

function fetch(url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload = () => successHandler(JSON.parse(xhr.response));
    xhr.send();
}

// function displayFollowers(username) {
//     followersUL.innerHTML = '';
//     fetch(`https://api.github.com/users/${username}/followers`, function (followersList) {
//         let topFive = followersList.slice(0,5);
//         topFive.forEach(info => {
//             let li = document.createElement('li');
//             let img = document.createElement('img');
//             img.src = info.avatar_url;
//             img.alt = info.name;
//             li.append(img);
//             followersUL.append(li);
//         })
//     })
// }

function displayExtraInfo(url, rootElm) {
    rootElm.innerHTML = '';
    fetch(url, function (userList) {
        let topFive = userList.slice(0,5);
        topFive.forEach(info => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = info.avatar_url;
            img.alt = info.name;
            li.append(img);
            rootElm.append(li);
        })
    })
}

function displayUI(data) {
    userImg.src = data.avatar_url;
    userName.innerText = data.name;
    userLink.innerText = '@'+data.login;
    displayExtraInfo(`https://api.github.com/users/${data.login}/followers`, followersUL);
    displayExtraInfo(`https://api.github.com/users/${data.login}/following`, followingUL);   
}

function handleChange(event) {
    if (event.keyCode === 13 && input.value) {
        const url = 'https://api.github.com/users/';
        let username = input.value;
        fetch(url+username, displayUI);
        input.value = '';
    }
}

input.addEventListener('keyup', handleChange);

function handleImage(event) {
    fetch('https://api.thecatapi.com/v1/images/search?limit=1&size=full', function (catInfo) {
        catImg.src = catInfo[0].url;
    })
    xhr2.send();
}

catBtn.addEventListener('click', handleImage);

