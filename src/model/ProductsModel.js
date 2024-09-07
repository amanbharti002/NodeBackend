require('../db/db')
const { default: mongoose } = require('mongoose')
const COLLECTION = require('../db/collection')
const{ObjectId} = require("mongodb")




const ProductsSchema = mongoose.Schema({
    ProductName:{type:String},
    ProductPrice:{type:Number},
    ProductCurrancy:{type:String,enm:["USD","INR"]},
    ProductUnit:{type:String,enm:["KG","POUND"]},
    ProductRating:{type:Number},
    ProductFeedback:{type:String},
    ProductStock:{type:Number},
    ProductInstock:{type:Boolean},
    ProductCatId:{type:String},
    ProductSubCatId:{type:String},
    ProductDescripton:{type:String},
    ProductTitle:{type:String},
    ProductImage:{type:String,default:".png"}
   
})
const ProductsModel = new mongoose.model(COLLECTION.Products,ProductsSchema)
module.exports = ProductsModel;







    
    
