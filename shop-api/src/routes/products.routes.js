const express = require("express");
const productRouter = express.Router();
const productController = require('../controllers/products.controller.js');

productRouter.get('/all', productController.getAll)
productRouter.get('/get/:id', productController.getSingleProduct)
productRouter.post('/create', productController.createProduct)
productRouter.delete('/delete', productController.deleteProduct)

module.exports = productRouter;