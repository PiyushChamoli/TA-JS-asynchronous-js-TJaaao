function fetch (url) {
    return Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let data = xhr.open('GET', url);
        xhr.onload = () => resolve(JSON.parse(data.response));
        xhr.onerror = () => reject('Something Went Wrong!');
        xhr.send();
    })
}

let userData = fetch('https://api.github.com/users/nnnkit');