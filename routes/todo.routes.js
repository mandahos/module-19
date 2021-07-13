const router = require('express').Router();
const { todoCtr } = require('../controllers');

router
  .route('/')
  .post(todoCtr.create)
  .get(todoCtr.get)
  .delete(todoCtr.delete);

module.exports = router;