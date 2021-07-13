const router = require('express').Router();
const todoRoutes = require('./todo.routes');
const viewRoutes = require('./view.routes');


// api routes
router.use('/api/todos', todoRoutes);

// handlebar/view routes
router.use('/', viewRoutes);

module.exports = router;