const {ObjectId} = require('mongodb')
const CategoryModel = require('../model/CategoryModel')
exports.addCategory = async function (req, res, next) {
    try{
        const catData = {
            catTitle: req.body.catTitle,
            catName: req.body.catName,
        }
        const catRes = await CategoryModel.create(catData);
        if (catRes) {
            res.json({
                status: "success",
                message: "category added !!"
            })
        }
        else{
            res.json({
                status: "failed",
                message: "something went wrong verify your data"
            })
        }
    }
    catch (error) {
        res.json({
            status: "failed",
            message: "something went wrong verify your data"
        })


    }
}

exports.getAllCategory = async function (req, res, next) {
    try {
        const query = req.body;
        const resData = await CategoryModel.find(query)
        if (resData) {
            res.json({
                status: "success",
                message: "Category find succesfully",
                data:resData
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Category cant find"

            })

        }
    }
    catch (error) {
        res.json({
            status: "Failed",
            messsage: "something went wrong"
        })
    }
}


exports.UpdateCategory = async function (req, res, next) {
    try {
        const query = { _id: req.params.id };
        const UpdateData = {
            catTitle: req.body.catTitle,
            catName: req.body.catName
        }
        console.log(query)
        const resData = await CategoryModel.updateOne(query, UpdateData)
        if (resData) {
            res.json({
                status: "success",
                message: "Category update succesfully"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Category  update cant find"

            })

        }
    }
    catch (error) {
        res.json({
            status: "failed",
            message: "something went wrong"

        })
    }
}

exports.DeleteCategory = async function (req, res, next) {

    try {
        const query = { _id: req.params.id };
        const DeleteData = {
            catTitle: req.body.catTitle,
            catTitle: req.body.catName

        }
        const resData = await CategoryModel.deleteOne(query,DeleteData)
        if (resData) {
            res.json({
                status: "success",
                message: "Category delete succesfully"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Category  delete cant find"

            })

        }

    }
    catch (error) {
        res.json({
            status: "failed",
            message: "something went wrong"

        }) 
    }
}

exports.Cataggregate = async function(req,res,next){
    const id = req.params.id;
    // console.log(id);

    const resData = await CategoryModel.aggregate([
        {$match:{_id:new ObjectId(id)}},
        {
           $lookup:{
            from:"subcategories",
            localField:"_id",
            foreignField:"cat_id",
            as:"sub_info"
           } 
        }
    ])
    if(resData){
        res.json({
            status:"success",
            message:"get all info",
            aggreagteData:resData
        })
    }
    else{
        res.json({
            status:"failed",
            message:"failed all info"
        })
    }
}
