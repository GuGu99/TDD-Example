const express = require('express');
const app = express();

const users = [
  {id:1, name: 'qwer'},
  {id:2, name: 'asdf'},
  {id:3, name: 'zxcv'}
];

app.get('/', (req, res) => {
  res.send(`Hello Wordl!`);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log(`Server Running!`);
});

module.exports = app;