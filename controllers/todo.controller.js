const { Todo } = require('../models');

module.exports = {

  // creates a new todo and adds ref to User model
  create: async function (req, res, next) {
    try {
      const todo = await Todo.create({
        message: req.body.message,
      });

      res.status(200).json({ data: todo });
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  },

  // fetch todos via a User _id
  get: async function (req, res, next) {
    try {
      const todos = await Todo.find();

      res.status(200).json({ data: todos });
    } catch (error) {
      console.log(error);
    }
  },

  // delete Todo from collection
  delete: async function (req, res, next) {
    try {
      const todo = await Todo.findOneAndDelete({ _id: req.body.todoId });

      if (todo === null) {
        return res.status(404).json({ error_message: 'No todo found with given id!' });
      }

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({});
    }
  }

};
