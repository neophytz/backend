const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var products = require('./store');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send({
        message:"Working!!"
    })
})


// Products

// getting all products

app.get('/products/all', (req, res) => {
    return res.send({
        message:"All the products are being displayed.",
        products:products,
        count:products.length
    })
})


//create new product
app.post('/products/create', (req, res) => {
    // adding product in products store.
    // if my product id already exits? -> error
    // done productName, productPrice, stock -> should be there -> empty , undefined -> error
    if(products.findIndex(i => i.productId===req.body.productId)===-1){        
        // productId is new. -> generate a new product.
        products=[...products, req.body];
        // sending the response back.
        return res.send({
            message:"Successfully Created New Product!!"
        })
    }
    return res.send({
        message:"Error While Generating New Product."
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Started On port http://localhost:${PORT}`)
})