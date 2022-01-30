let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;

let newsElm = document.querySelector('.news');
let selectElm = document.querySelector('select');
let main = document.querySelector('.main');
let errorElm = document.querySelector('.error-message');
let allNews = [];

function handleErrorMessage(message = 'Something Went Wrong..') {
    main.style.display = 'none';
    errorElm.style.display = 'block';
    errorElm.innerText = message;
}

function handleSpinner(status = false) {
    if (status) {
        newsElm.innerHTML = `<div class="donut"></div>`; 
    }
}

function renderNews(news) {
    newsElm.innerHTML = '';
    news.forEach(newsItem => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    img.alt = newsItem.title;
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = newsItem.newsSite;
    let h3 = document.createElement('h3');
    h3.innerText = newsItem.title;
    let button = document.createElement('button');
    button.innerText = `Read More`
    let a = document.createElement('a');
    a.href = newsItem.url;
    a.append(button);
    div.append(span,h3,a);
    li.append(img,div);
    newsElm.append(li);
    });
}

function displayOptions(sources) {
    sources.forEach(source => {
        let option = document.createElement('option');
        option.innerText = source;
        option.value = source;
        selectElm.append(option);
    })
} 

function init() {
    handleSpinner(true);
    fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Response not okay!');
        }
    })
    .then((news) => {
        handleSpinner();
        renderNews(news);
        allNews = news;
        let allSources = Array.from(new Set(news.map(n => n.newsSite)));
        displayOptions(allSources);
    }).catch((error) => {
        handleErrorMessage(error);
    }).finally(() => handleSpinner());
}

selectElm.addEventListener('change', (event) => {
    let source = event.target.value.trim();
    if (source) {
        var filteredNews = allNews.filter(news => news.newsSite == source);
    } else {
        filteredNews = allNews;
    }
    renderNews(filteredNews);
})

if (navigator.onLine) {
    init();
} else {
    handleErrorMessage();
}
