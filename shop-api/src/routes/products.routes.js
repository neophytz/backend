const express = require("express");
const productRouter = express.Router();
const productController = require('../controllers/products.controller.js');

productRouter.get('/all', productController.getAll)
productRouter.get('/get/:product_id', productController.getSingleProduct)
productRouter.put('/update/:product_id', productController.updateProductById)
productRouter.post('/create', productController.createProduct)
productRouter.delete('/delete/:product_id', productController.deleteProduct) 

module.exports = productRouter;