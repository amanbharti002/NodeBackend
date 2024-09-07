const mongoose = require('mongoose');
const SubCategoryModel = require('../model/SubCategoryModel')
exports.addSubCategory = async function(req,res,next){
   
    try{
        const subcatData = {
            catsubcatTitle: req.body.catsubcatTitle,
            catsubcatName: req.body.catsubcatName,
            cat_id: req.body.cat_id
        }
       
        const resData = SubCategoryModel.create(subcatData)
        if (resData) {
            res.json({
                status: "success",
                message: "SubCategory added !!",
                data:resData
            })
        }
        else {
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

exports.getAllSubCategory = async function(req,res,next){
   try{
    const findData = await SubCategoryModel.find({})
    if(findData){
        res.json({
            status:"success",
            message:"your data fetched",
            data:findData
        })
    }else{
        res.json({
            status:"failed",
        message:"unable to find  your data"
        })
    }
   }catch(err){
    res.json({
        message:"fail ho gya"
    })
   }
}

exports.updateSubCategory = async function(req,res,next){
    try{
        const query = {_id:req.params._id}
        const UpdateData = {
            catsubcatTitle:req.body.catsubcatTitle,
            catsubcatName:req.body.catsubcatName,
        }
        // console.log(query)
        // console.log(UpdateData)
        const resData = await SubCategoryModel.updateOne(query,UpdateData)
        if (resData) {
            res.json({
                status: "success",
                message: "SubCategory update succesfully"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "SubCategory  update cant find"

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

// Function to get a single subcategory by ID
exports.getSingleSubCategory = async function(req, res, next) {
    try {
        const query = { _id: req.params._id };
        const subCategory = await SubCategoryModel.findOne(query);

        if (subCategory) {
            res.status(200).json({
                status: "success",
                data: subCategory
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "SubCategory not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Something went wrong"
        });
    }
};

// Function to delete a subcategory by ID
exports.deleteSubCategory = async function(req, res, next) {
    try {
        const query = { _id: req.params._id };
        const resData = await SubCategoryModel.deleteOne(query);

        if (resData.deletedCount > 0) {
            res.status(200).json({
                status: "success",
                message: "SubCategory deleted successfully"
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "SubCategory not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Something went wrong"
        });
    }
};

exports.searchSubCategory = async function(req,res,next){
    try{
        const searchquery = req.params.title
        const findData = {catsubcatTitle:{$regex:`^${searchquery}`,$options:"i"}}
        console.log(findData)
        const searchsubData =  await SubCategoryModel.find(findData)

        if(searchsubData){
            res.json({
                status:"search success",
                message:"search ho gya hai"
            })
        }
        else{
            res.json({
                status:"search failed",
                message:"seach not Found"
            })
        }

    }
    catch(err){
        res.json({
            status:"failed",
            message:"something went wrong"
        })
    }
}

