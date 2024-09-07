const express = require('express')
const {addSubCategory,getAllSubCategory, updateSubCategory, getSingleSubCategory, deleteSubCategory, searchSubCategory} = require("../controller/SubCategoryController")

const SubCategoryRouter = express.Router()
SubCategoryRouter.post("/addSubCategory",addSubCategory);
SubCategoryRouter.get("/getAllSubCategory",getAllSubCategory)
SubCategoryRouter.put('/updateSubCategory/:_id', updateSubCategory);
SubCategoryRouter.get('/getSingleSubCategory/:_id', getSingleSubCategory);
SubCategoryRouter.delete('/deleteSubCategory/:_id', deleteSubCategory);
SubCategoryRouter.get('/searchSubCategory',searchSubCategory);
module.exports = SubCategoryRouter
