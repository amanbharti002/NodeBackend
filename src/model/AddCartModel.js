require('../db/db');
const COLLECTION = require('../db/collection');
const mongoose = require('mongoose');
const {ObjectId} = require("mongodb")

const AddCartSchema = mongoose.Schema({
    user_id:{type:ObjectId},
    product_id:{type:ObjectId},
    qty:{type:Number}

})

const AddCartModel = new mongoose.model(COLLECTION.AddCart,AddCartSchema)
module.exports = AddCartModel

