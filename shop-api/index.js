const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRouter = require('./src/routes/products.routes.js')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send({
        message:"Working!!"
    })
})

app.use('/products', productRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Started On port http://localhost:${PORT}`)
})

// MVC architecture
// M-> Model (schemas) , V -> View (but the routes, endpoints), C -> Controllers.
// databases -> tables structure (columns, setting some rules, checks) -> schemas.
// view -> define all the request and endpoints.
// controllers -> controls the actions on any request.