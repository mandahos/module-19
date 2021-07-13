const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: 'Todo Message is Required'
  },
  
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Todo = model('Todo', TodoSchema);

module.exports = Todo;
