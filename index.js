// console.log("hello world");
//express (framework) body-parser cors

const bodyParser = require('body-parser');
const express = require('express'); // importing express to our file
const cors = require('cors');

const app = express(); // for initialising an express app

app.use(bodyParser.json()); // for parsing all output in json

app.use(cors("*"));

const port = 8080; // 3000 -> react and 8080 -> backend

app.get('/api', (req, res) => {
    console.log(req.body);
    res.send({
        "status":"working",
    });
})

app.get('/api/user', (req, res) => {
    res.send('Hello Users');
})

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});