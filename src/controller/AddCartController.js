const AddCartModel = require("../model/AddCartModel");
const {ObjectId} = require('mongodb');
exports.addAddCart = async function(req,res,next){
    try{
        const AddCart = {
            user_id : req.user_id,
            product_id:req.product_id,
            qty:req.body.qty

        }
        const AddCartRes = await AddCartModel.create(AddCart)
        if(AddCartRes){
            res.json({
                status:"success",
                message:"AddCart Success"

            })
        }
        else{
            res.json({
                status:"failed",
                message:"AddCart failed"
            })
        }

    }
    catch{
        res.json({
            status:"failed",
            message:"something went wrong"
        })
    }
}

exports.CartAggregate = async function(req,res,next){
    try{
     const u_id =    req.user_id;

    const resData =  await AddCartModel.aggregate([
        {$match: {user_id: u_id}},
        {
            $lookup:{
                from:"products",
                localField:"product_id",
                foreignField:"_id",
                as:"data"
            }
        }

    ])
    if (resData) {
        res.json({
            status: 'success',
            data: resData
        })
    }

    else {
        res.json({
            status: "failed",
            message: "unable to aggregate cart"
        })
    }
}
catch(error){
    res.end(JSON.stringify({
        status: "failed",
        message: 'someting went wrong',
        error: err
    }))

}


}

exports.updateCart = async function(req,res,next){
    try{
        const query ={_id:req.params.id}
        const updateData = {$inc:{qty:+1}}
        const resData = await AddCartModel.updateOne({id: new ObjectId(query._id),updateData})
        if(resData){
            res.json({
                status:"success",
                message:"One Item Added"
               })
        }
        else{ 
            res.json({
                status:"failed",
                message:"unable to add item"
            })
        }

    }
    catch(error){
        res.json({
            "status":"failed",
            "message":"failed to add items"      })
    }
}