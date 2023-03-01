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

// getting a single product 
// get the product id from user.
// find the product -> return the product otherwise I will return no product found.

app.get('/products/get/:id', (req, res) => {
    // find the id that i am getting from the user.
    // query params -> helps us to make our urls dynamic.
    // we can't send payload with the browser.
    // we can send data in the endpoint.
    var id = req.params.id; //(baseurl/endpoint/${id})
    //var id = req.query.id;/// (baseurl/endpoint/?id=102)
    // console.log(id);
    // console.log(typeof(id));
    var idx = products.findIndex(i => i.productId === parseInt(id));
    if(idx!==-1){
        return res.send({
            message:"Product Found!",
            product:products[idx]
        });
    }
    else{
        return res.send({
            message:"No Product Found!"
        });
    }
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

// deleting a product
// find the product using product id.
// if found -> delete it using array methods..
// otherwise -> send an error response.
app.delete('/products/delete', (req, res) => {
    var id = req.query.id;
    var idx = products.findIndex(i => i.productId === parseInt(id))
    if( idx !== -1){
        //delete the item
        var item = products[idx];
        products.splice(idx, 1);
        // return res
        return res.send({
            message:"Successfully deleted the product.",
            deletedProductDetails: item
        })
    }
    return res.send({
        message:"No such product found."
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Started On port http://localhost:${PORT}`)
})

// MVC architecture
// M-> Model (schemas) , V -> View (but the routes, endpoints), C -> Controllers.
// databases -> tables structure (columns, setting some rules, checks) -> schemas.
// view -> define all the request and endpoints.
// controllers -> controls the actions on any request.