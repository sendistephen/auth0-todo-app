const express = require('express');
const jwtAuthz = require('express-jwt-authz');
const { jwtCheck, checkScopes } = require('../middleware/check-jwt');
const guard = require('express-jwt-permissions')();
const {
  getAllTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
  createTodo,
} = require('../controllers/todos');
const router = express.Router();

// api/v1/todos
router.get('/', jwtCheck, getAllTodos);

// api/v1/todos/36562562
router.get('/:id', getSingleTodo);
// api/v1/todos/36562562
router.delete('/:id', jwtCheck, deleteTodo);
// api/v1/todos/36562562
router.patch('/:id', jwtCheck, updateTodo);
//api/v1/todos
router.post('/', jwtCheck, createTodo);
module.exports = router;
