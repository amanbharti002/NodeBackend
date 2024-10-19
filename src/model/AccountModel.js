require('../db/db')
const mongoose = require('mongoose');
const COLLECTION = require('../db/collection');

const Accountschema = mongoose.Schema(
    {
        name:{type:String,required:[true,"Name is required"],validate: {
            validator: function(v) {
              return /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(v);
            },
            message: props => `${props.value} is not a valid name !`
          }},
        email:{type:String,unique:true,required:[true,"Email is required failed"],validate:{
            validator:function(v){
                return  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            },
            message: props => `${props.value} is not a valid email !`
        }},
        password:{type:String},
        account_status:{type:Number,default:0}
    }
)
const Accountmodel = new mongoose.model(COLLECTION.Account,Accountschema);
module.exports = Accountmodel
