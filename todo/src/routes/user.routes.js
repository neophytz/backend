const express = require("express");
const userRouter = express.Router();

const {get, create, update} = require('../controllers/user.controller')

// naming conventions : /api/user
userRouter.get('/', get)

// making a new entry in the database : /api/user
userRouter.post('/', create)

// updating an entry? : /api/user/1
userRouter.put('/:user_id', update)

// delete an entry? : /api/user/1
userRouter.delete('/:user_id', (req, res) => {})


module.exports = userRouter;