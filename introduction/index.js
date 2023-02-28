// console.log("hello world");
//express (framework) body-parser cors

const bodyParser = require('body-parser');
const express = require('express'); // importing express to our file
const cors = require('cors');

const app = express(); // for initialising an express app

app.use(bodyParser.json()); // for parsing all output in json

app.use(cors("*")); // restrictions on accessibility of my endpoints

const port = 8080; // 3000 -> react and 8080 -> backend

app.get('/api', (req, res) => {
    console.log(req.body);
    if(req.body.username==='nikhil' && req.body.password==='password'){
        return res.send("Hello Nikhil, you are authorized user!!!");
    }
    else{
        return res.send("You are not authorized!!");
    }
})

// access tokens are response.
// access denied. empty access token.

// I can create a get request without any payload with the help of browser.

app.post('/api', (req, res)=>{
    return res.send("hello from backend!!");
})

app.get('/api/user', (req, res) => {
    res.send('Hello Users');
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}/api`);
});