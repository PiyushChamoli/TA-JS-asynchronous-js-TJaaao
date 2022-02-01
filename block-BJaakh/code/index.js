const url = 'https://sleepy-falls-37563.herokuapp.com/api/todo';

let rootUL = document.querySelector('.todo-list');
let inputElm = document.querySelector();

function handleDelete(id) {
    fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => fetchTodos());
}

function handleToggle(id, status) {
    let data = {
        todo: {
            isCompleted: !status,
        }
    }
    fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(() => fetchTodos());
}



function createUI(todos) {
    rootUL.innerHTML = '';
    todos.forEach(data => {
        let li = document.createElement('li');
        let input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = data.isCompleted;
        input.setAttribute('data-id', data._id);
        input.addEventListener('click',() => {
            handleToggle(data._id, data.isCompleted);
        })
        let p = document.createElement('p');
        p.innerText = data.title;
        p.addEventListener('dblclick', (event) => {
            handleEdit(event, data._id, data.title);
        })
        let span = document.createElement('span');
        span.innerText = 'x';
        span.setAttribute('data-id', data._id);
        span.addEventListener('click', () => {
            handleDelete(data._id);
        })
        li.append(input,p,span);
        rootUL.append(li);
    });
}

function addTodo(event) {
    if (event.keyCode === 13 && event.target.value.trim()) {
        let value = event.target.value;
        let data = {
            todo: {
                title: value,
            }
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(() => {
            event.target.value = '';
            fetchTodos();
        });
    }
}

function fetchTodos() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => createUI(data.todos));
}

inputElm.addEventListener('keyup', addTodo);

fetchTodos();