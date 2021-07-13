// DOM nodes
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

let interval = setInterval(function () {
  if (document.readyState === 'complete') {
    clearInterval(interval);

    fetchTodos();
  }
}, 100);


// event delegation
document.body.addEventListener('click', (e) => {
  if (e.target && e.target.className.includes('todo-delete-btn')) {
    deleteTodo(e.target.dataset.todoId);
  }
});

// ********************************************************************************** FUNCTIONS

// add form event listener
todoForm.addEventListener('submit', submitTodoForm);

/**
 * @desc: handles todo form submission
 * @param e: DOM Event Object 
 */
async function submitTodoForm(e) {
  e.preventDefault();

  const todoInput = document.getElementById('todo-form-input');
  const inputValue = todoInput.value.trim();

  if (!inputValue) {
    return alert('Please enter a value');
  }

  try {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: inputValue })
    });

    if (response.ok) {
      todoInput.value = '';
      location.reload();
    }

    // buildTodos();
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc: builds todo UI display
 * @param {array} todos 
 */
function buildTodos(todos) {
  const todoContainer = document.getElementById('todo-list');

  for (let todo of todos) {
    const todoWrapper = document.createElement('li');
    todoWrapper.classList = 'list-group-item d-flex justify-content-between';

    const todoMessage = document.createElement('span');
    todoMessage.classList = 'todo-item-message';
    todoMessage.innerText = todo.message; 

    const todoDelete = document.createElement('button');
    todoDelete.classList = 'btn btn-danger todo-delete-btn';
    todoDelete.setAttribute('data-todo-id', todo._id);
    todoDelete.innerText = 'delete';

    todoWrapper.appendChild(todoMessage);
    todoWrapper.appendChild(todoDelete);

    todoContainer.appendChild(todoWrapper);
  }
}


/**
 * @desc: fetches todos from server
 */
async function fetchTodos() {
  try {
    const noTodosMessageEl = document.getElementById('no-todos-message');

    const response = await fetch('/api/todos');
    const json = await response.json();

    if (!json.data.length) {
      // no todos message
      noTodosMessageEl.style.display = 'block';
    } else {
      // build todos
      noTodosMessageEl.style.display = 'none';
      buildTodos(json.data);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
 * @param {string|number} id: index of todo to delete
 */
async function deleteTodo(idx) {
  try {
    const response = await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ todoId: idx })
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Oops... something went wrong!!');
    }

  } catch (error) {
    console.error(error);
  }
}
