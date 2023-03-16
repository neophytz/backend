// ? this must always be the first line, if you want to use envrionment variables.
require("dotenv").config() 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

const todoRouter = require('./src/routes/todo.routes')
const userRouter = require("./src/routes/user.routes")

// CROSS ORIGIN RESOURCE SHARING.
app.use(cors());
app.use(bodyParser.json());

app.use('/api/todo', todoRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    return res.send({
        message:"Working!!"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Started On port http://localhost:${PORT}`)
})

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("DB connected successfully.")
}).catch(err => {
    console.error("DB connection failed.")
    console.error(err)
    process.exit(1) 
});


/**
 * 1. Database -> Tables -> Schema
 * 2. Accessibility -> Routes
 * 3. In-depth logic to make it accessibile & 'keep our system zinda' -> Controller.
 */
