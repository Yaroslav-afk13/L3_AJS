// Задание 1: коллбэки
const https = require('https');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Запрос данныхмм- вызывает коллбэк с ошибкой или данными
function getData(url, callback) {
  https
    .get(url, (res) => {
      let raw = '';
      res.on('data', (chunk) => {
        raw += chunk;
      });
      res.on('end', () => {
        try {
          callback(null, JSON.parse(raw));
        } catch (err) {
          callback(err);
        }
      });
    })
    .on('error', callback);
}

// Сортировка постов по убыванию длины 
function sortPostsByTitleLength(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

// Сортировка комментариев по имени автора 
function sortCommentsByName(comments) {
  return [...comments].sort((a, b) => a.name.localeCompare(b.name));
}

function getSortedPosts(callback) {
  getData(`${BASE_URL}/posts`, (err, posts) => {
    if (err) return callback(err);
    callback(null, sortPostsByTitleLength(posts));
  });
}

function getSortedComments(callback) {
  getData(`${BASE_URL}/comments`, (err, comments) => {
    if (err) return callback(err);
    callback(null, sortCommentsByName(comments));
  });
}

getSortedPosts((err, posts) => {
  if (err) return console.error('Ошибка posts:', err);
  console.log('Посты (по убыванию длины title), первые 3:');
  console.log(posts.slice(0, 3));
});

getSortedComments((err, comments) => {
  if (err) return console.error('Ошибка comments:', err);
  console.log('Комментарии (по name), первые 3:');
  console.log(comments.slice(0, 3));
});
