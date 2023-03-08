var products = require('../../store');
const { http_formatter } = require("../util/formatter");
const { Product } = require('../schemas/product.schema')

const getAll = (req, res) => {
    return res.send(http_formatter("All the products are being displayed", products));
}

const getSingleProduct = (req, res) => {
    const id = req.params.id;
    var idx = products.findIndex(i => i.productId === parseInt(id));
    if(idx!==-1){
        return res.send(http_formatter("Product Found", products[idx]))
    }
    else{
        return res.send(http_formatter("No Product Found!"))
    }
}

const createProduct = (req, res) => {
    // if(products.findIndex(i => i.productId===req.body.productId)===-1){        
    //     products=[...products, req.body];
    //     return res.send(http_formatter("Successfully created new product!!"))
    // }
    // return res.send(http_formatter("error while generating new product"))
    const _product = new Product(req.body);
    _product.save().then(doc => {
        return res.send(http_formatter("Successfully created new product!!", doc))
    }).catch(err => {
        return res.send(http_formatter("Failed to create a product", err, false))
    })
}

const deleteProduct = (req, res) => {
    var id = req.query.id;
    var idx = products.findIndex(i => i.productId === parseInt(id))
    if( idx !== -1){
        var item = products[idx];
        products.splice(idx, 1);
        return res.send(http_formatter("Successfully deleted the product", item))
    }
    return res.send(http_formatter("No such product found"))
}

module.exports = {getAll, getSingleProduct, createProduct, deleteProduct}