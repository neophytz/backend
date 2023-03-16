const express = require("express");
const todoRouter = express.Router();

const {get, create, _delete, deleteMany} = require('../controllers/todo.controller')

// naming conventions : /api/todo
todoRouter.get('/', get)

// get a unique todo using id : /api/todo/1
todoRouter.get('/:todo_id', (req,res) => {})

// making a new entry in the database : /api/todo
todoRouter.post('/', create)

// updating an entry? : /api/todo/1
todoRouter.put('/:todo_id', (req, res) => {})

// delete all entries for a user : /api/todo/delete_multiple
todoRouter.delete('/delete_multiple', deleteMany)

// UUId4
// delete an entry? : /api/todo/1 | /api/todo/delete_multiple | /api/todo/64134e012d53fb3a84f8c727 
todoRouter.delete('/:todo_id', _delete)


module.exports = todoRouter;