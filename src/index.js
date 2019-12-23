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
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.listen(3000, () => {
  console.log(`Server Running!`);
});

module.exports = app;