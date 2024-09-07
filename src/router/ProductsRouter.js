const express = require('express');
const { addProduct,getAllProduct, deleteProduct, updateProduct, getSingleProduct, searchProduct, getProductImage, uploadProductImages} = require('../controller/Productscontroller');
const upload = require("../middleware/ImageMiddleware")
const ProductsRouter = express.Router()

ProductsRouter.post('/addProduct',upload.single("ProductImage"),addProduct);
ProductsRouter.get('/getAllProduct',getAllProduct);
ProductsRouter.delete('/deleteProduct/:id',deleteProduct);
ProductsRouter.put('/updateProduct/:id',updateProduct);
ProductsRouter.get('/getSingleProduct/:id',getSingleProduct);   
ProductsRouter.get('/getProductImage/:id',getProductImage);
ProductsRouter.post('/ProductImageupload',upload.single("image"),uploadProductImages);
ProductsRouter.get('/searchProduct',searchProduct);
module.exports = ProductsRouter