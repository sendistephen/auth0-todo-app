const Todos = require('../models/Todos');
//  If you want to use the sub claim to identify the user uniquely, you can simply use req.user.sub
/**
 * @route GET api/v1/todos
 * @description Get list of todos
 * @access Public
 * */
exports.getAllTodos = async (req, res) => {
  await Todos.find({ user_id: req.user.sub }, (err, foundTodos) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json(foundTodos);
  });
};

/**
 * @route GET api/v1/todos/64474
 * @description Get single todo
 * @access Public
 * */
exports.getSingleTodo = async (req, res) => {
  await Todos.findById(req.params.id, (err, foundTodo) => {
    if (err || !foundTodo) {
      return res.status(400).json({ error: err });
    }
    return res.json(foundTodo);
  });
};

/**
 * @route DELETE api/v1/todos/83473
 * @description Delete a todo from  a list of todos
 * @access Public
 * */
exports.deleteTodo = async (req, res) => {
  const foundTodo = await Todos.findById(req.params.id);
  if (!foundTodo) {
    return res.status(400).json({ msg: 'Todo not found' });
  }
  // remove todo
  foundTodo.remove();
  return res.json({ msg: 'Resource deleted successfully!', foundTodo });
};

/**
 * @route PUT api/v1/todos
 * @description Update todo
 * @access Public
 * */
exports.updateTodo = async (req, res) => {
  const foundTodo = await Todos.findById(req.params.id);
  if (!foundTodo) {
    return res.status(400).json({ msg: 'Todo not found' });
  }
  const todoData = req.body;
  if (!todoData) {
    return res.status(400).json({ msg: 'All fields are required!' });
  }
  // update todo
  foundTodo.set(todoData);
  // save todo
  foundTodo.save();
  return res.json(foundTodo);
};

/**
 * @route POST api/v1/todos
 * @description Create todo
 * @access Public
 * */
exports.createTodo = async (req, res) => {
  const todoData = req.body;
  todoData.user_id = req.user.sub;
  if (!todoData) {
    return res.status(400).json({ msg: 'All fields required' });
  }
  // check if todo exists -> avoid duplicates
  const todoExists = await Todos.findOne({ title: todoData.title });
  if (todoExists) {
    return res.status(400).json({ msg: 'Todo with that title already exists' });
  }
  await Todos.create(todoData, (err, savedTodo) => {
    if (err) return res.status(400).json({ error: err });
    return res.status(200).json(savedTodo);
  });
};
