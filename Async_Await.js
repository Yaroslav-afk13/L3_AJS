// Задание 3: async/await
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Запрос данных
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

// Сортировка постов по убыванию длины
function sortPostsByTitleLength(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

// Сортировка комментариев по имени автора
function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
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

async function getSortedPosts() {
  const posts = await getJson(`${BASE_URL}/posts`);
  return sortPostsByTitleLength(posts);
}

async function getSortedComments() {
  const comments = await getJson(`${BASE_URL}/comments`);
  return sortCommentsByName(comments);
}

async function getUsers() {
  const users = await getJson(`${BASE_URL}/users`);
  return pickUserFields(users);
}

async function getUncompletedTodos() {
  const todos = await getJson(`${BASE_URL}/todos`);
  return filterNotCompleted(todos);
}

async function main() {
  try {
    // Независимые запросы выполняем параллельно
    const [posts, comments, users, todos] = await Promise.all([
      getSortedPosts(),
      getSortedComments(),
      getUsers(),
      getUncompletedTodos(),
    ]);

    console.log('Посты, первые 3:', posts.slice(0, 3));
    console.log('Комментарии, первые 3:', comments.slice(0, 3));
    console.log('Пользователи, первые 3:', users.slice(0, 3));
    console.log(`Невыполненные задачи: ${todos.length}, первые 3:`, todos.slice(0, 3));
  } catch (err) {
    console.error('Ошибка:', err);
  }
}

main();
