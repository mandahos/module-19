const router = require('express').Router();
const path = require('path');
const { Todo } = require('../models');

router.get('/', (req, res, next) => {
  return res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/todos', async (req, res, next) => {
  const todos = await Todo.find().lean();
  
  return res.sendFile(path.join(__dirname, '../public/todos.html'), { todos });
});

module.exports = router;
