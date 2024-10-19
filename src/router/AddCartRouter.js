const express = require('express')
const{addAddCart} = require('../controller/AddCartController')
const AddCartRouter = express.Router()


AddCartRouter.post('/addAddCart',addAddCart);
module.exports = AddCartRouter
