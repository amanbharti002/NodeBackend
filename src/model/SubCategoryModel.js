require('../db/db')
const COLLECTION = require('../db/collection')
const mongoose = require('mongoose');
 const {ObjectId} = require('mongodb')
const SubCategorySchema = mongoose.Schema({
    catsubcatTitle:{type:String},
    catsubcatName:{type:String},
    cat_id:{type:ObjectId}
})

const SubCategoryModel = new mongoose.model(COLLECTION.SubCategory,SubCategorySchema)
module.exports = SubCategoryModel