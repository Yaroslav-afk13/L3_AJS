// Задание 2: промисы
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Запрос данных- возвращает промис с распарсенным JSON
function getJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  });
}

// Оставляем только нужные поля 
function pickUserFields(users) {
  return users.map(({ id, name, username, email, phone }) => ({
    id,
    name,
    username,
    email,
    phone,
  }));
}

// Оставляем только невыполненные задачи
function filterNotCompleted(todos) {
  return todos.filter((todo) => !todo.completed);
}

function getUsers() {
  return getJson(`${BASE_URL}/users`).then(pickUserFields);
}

function getUncompletedTodos() {
  return getJson(`${BASE_URL}/todos`).then(filterNotCompleted);
}

getUsers()
  .then((users) => {
    console.log('Пользователи (5 полей), первые 3:');
    console.log(users.slice(0, 3));
  })
  .catch((err) => console.error('Ошибка users:', err));

getUncompletedTodos()
  .then((todos) => {
    console.log(`Невыполненные задачи: ${todos.length}, первые 3:`);
    console.log(todos.slice(0, 3));
  })
  .catch((err) => console.error('Ошибка todos:', err));
