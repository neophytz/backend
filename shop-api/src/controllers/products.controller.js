var products = require('../../store');
const { http_formatter } = require("../util/formatter");
const { Product } = require('../schemas/product.schema')

//either you use async-await or you use then-catch

// method 1
// const getAll = async (req, res) => {
    
//     // const cursor = Product.find().cursor();

//     // // order -> preparing food.
//     // // eat -> consumed
//     // // pay for the stuff.
//     // var data = [];
//     // for(let doc = await cursor.next(); doc!=null ; doc = await cursor.next()){
//     //     data= [...data, doc];
//     // }
//     return res.send(http_formatter("All the products are being displayed", data));
// }

//method 2
const getAll = (req, res) => { 
    Product
    .find({}) // all.
    .select('name price')
    .then((result)=> {
        res.send(http_formatter("All products are being displayed", result))
    })
    .catch((err) => res.send(http_formatter("Error while finding products", err)));
}

// const getProductById = (req, res) => {
//     const id = req.params.id;
//     if (!id){
//         return res.send(http_formatter("Error while finding products", new Error("ID is required.")));
//     }

//     Product.findById(id).then(res => {
//         res.send(http_formatter("All products are being displayed", result))
//     }).catch((err) => {res.send(http_formatter("error while finding product", err))})
// }

// localhost:9090/users/:user/:comments
const getSingleProduct = (req, res) => {
    const id = req.params.product_id;
    Product.find({_id:id}).then((result)=>{
        res.send(http_formatter("Product Found", result))
    }).catch((err) => {res.send(http_formatter("error while finding product", err))});

    // const id = req.params.id;
    // var idx = products.findIndex(i => i.productId === parseInt(id));
    // if(idx!==-1){
    //     return res.send(http_formatter("Product Found", products[idx]))
    // }
    // else{
    //     return res.send(http_formatter("No Product Found!"))
    // }
}

const createProduct = (req, res) => {
    // if(products.findIndex(i => i.productId===req.body.productId)===-1){        
    //     products=[...products, req.body];
    //     return res.send(http_formatter("Successfully created new product!!"))
    // }
    // return res.send(http_formatter("error while generating new product"))

    // I'm making object of a class. 
    // this line does following things
    /**
     * 1. validation of data
     * 2. initializing default values that we have defined in the schema.
     * 3. tranforms the data as defined in the schema.
     */
    const _product = new Product(req.body);
    _product.save().then(doc => {
        return res.send(http_formatter("Successfully created new product!!", doc))
    }).catch(err => {
        return res.send(http_formatter("Failed to create a product", err, false))
    })
}

const updateProductById = (req, res) => {
    const id = req.params.product_id;
    const new_price = req.body.price;
    Product.findOneAndUpdate({_id: id}, {
        price: new_price
    }).then(doc => {
        return res.send(http_formatter("Successfully created new product!!", doc))
    }).catch(err => {
        return res.send(http_formatter("Failed to create a product", err, false))
    })
}

const deleteProduct = (req, res) => {
    const product_id = req.params.product_id;
    Product.findByIdAndDelete(product_id).then(doc => {
        return res.send(http_formatter("Successfully deleted new product!!", doc))
    }).catch(err => {
        return res.send(http_formatter("Failed to deleted a product", err, false))
    })
    // var idx = products.findIndex(i => i.productId === parseInt(id))
    // if( idx !== -1){
    //     var item = products[idx];
    //     products.splice(idx, 1);
    //     return res.send(http_formatter("Successfully deleted the product", item))
    // }
    // return res.send(http_formatter("No such product found"))
}

module.exports = {getAll, getSingleProduct, createProduct, deleteProduct, updateProductById}