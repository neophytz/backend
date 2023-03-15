const express = require("express");
const todoRouter = express.Router();

const {get, create} = require('../controllers/todo.controller')

// naming conventions : /api/todo
todoRouter.get('/', get)

// get a unique todo using id : /api/todo/1
todoRouter.get('/:todo_id', (req,res) => {})

// making a new entry in the database : /api/todo
todoRouter.post('/', create)

// updating an entry? : /api/todo/1
todoRouter.put('/:todo_id', (req, res) => {})

// delete an entry? : /api/todo/1
todoRouter.delete('/:todo_id', (req, res) => {})

// delete all entries for a user : /api/todo/3/delete_all
todoRouter.delete('/:user_id/delete_all', (req, res) => {})


module.exports = todoRouter;