const express = require('express')
const {addCategory, getAllCategory, Cataggregate,UpdateCategory } = require('../controller/CategoryController')
const CategoryRouter = express.Router();

CategoryRouter.post('/addCategory',addCategory);
CategoryRouter.get('/getAllCategory',getAllCategory);
CategoryRouter.get("/getsubinfo/:id",Cataggregate);
CategoryRouter.put("/UpdateCategory/:id",UpdateCategory);
module.exports = CategoryRouter