const mongoose = require('mongoose')
const ProductsModel = require('../model/ProductsModel')
const { validationResult } = require('express-validator');
const ImageModel = require('../model/ImageModel');

exports.addProduct = async function (req, res, next) {
    
    const ProductData = {
        ProductName: req.body.ProductName,
        ProductPrice: req.body.ProductPrice,
        ProductCurrancy: req.body.ProductCurrancy,
        ProductUnit: req.body.ProductUnit,
        ProductRating: req.body.ProductRating,
        ProductFeedback: req.body.ProductFeedback,
        ProductStock: req.body.ProductStock,
        ProductInstock: req.body.ProductInstock,
        ProductCatId: req.body.ProductCatId,
        ProductSubCatId: req.body.ProductSubCatId,
        ProductDescripton: req.body.ProductDescripton,
        ProductTitle: req.body.ProductTitle,
        ProductImage:req.imagePath
    };

    console.log(ProductData)

    try {
        const productRes = await ProductsModel.create(ProductData);
        if (productRes) {
            return res.status(201).json({
                status: "success",
                message: "Product added successfully"
            });
        } else {
            return res.status(500).json({
                status: "failed",
                message: "Something went wrong, please verify your data"
            });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: "failed",
                message: "Validation failed",
                error: error.message
            });
        }
        return res.status(500).json({
            status: "failed",
            message: "An error occurred while adding the product",
            error: error.message
        });
    }
};


exports.getAllProduct = async function (req, res, next) {
    try {
         const pageNo = req.query.pageno
         console.log(pageNo)
         const limit = 5;
        const totalCount = await ProductsModel.find({})
        const totalLenght = totalCount.length
        const pages = Math.ceil(totalLenght /limit)
        if(pageNo <= pages){
            const offset = (pageNo - 1) *limit;
            const resData = await ProductsModel.find({}).skip(offset).limit(limit)
            if (resData) {
                res.json({
                    status: "success",
                    message: "get all products",
                    data: resData
    
                })
            }
            else {
                res.json({
                    status: "failed",
                    message: "something went wrong verify your data"
                })
    
            }
        }
         
        

    }
    catch (error) {
        res.json({
            status: "Failed",
            message: "Something went wrong",
            error: error

        })

    }
}

exports.deleteProduct = async function (req, res, next) {
    try {
        const query = { _id: req.params.id }
        console.log(query)
        const resData = await ProductsModel.deleteOne(query)
        console.log(resData)
        if (resData) {
            res.json({
                status: "success",
                message: "delete products",


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
            message: "something went wrong"

        })
    }
}

exports.updateProduct = async function (req, res, next) {
    try {
        const query = { _id: req.params.id };
        const updateData = req.body; // Ensure updateData is obtained from the request body

        const resData = await ProductsModel.updateOne(query, updateData);
        console.log(resData);

        if (resData.modifiedCount > 0) { // Check if any documents were modified
            res.json({
                status: "success",
                message: "Product updated successfully"
            });
        } else {
            res.json({
                status: "failed",
                message: "No changes were made. Please verify your data"
            });
        }
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
        res.json({
            status: "failed",
            message: "Something went wrong. Please try again later"
        });
    }
};

exports.getSingleProduct = async function (req, res, next) {
    try {
        const query = { _id: req.params.id }
        const resData = await ProductsModel.findOne(query)
        if (resData) {
            res.json({
                status: "success",
                message: "updated products",


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
            message: "something went wrong"

        })
    }

}



  exports.searchProduct = async function(req, res, next) {
    try {
        const searchquery = { name: req.query.name };
        console.log(searchquery);

        const findData = { ProductName: { $regex: `^${searchquery.name}`, $options: "i" } };
        console.log(findData);

        let findProduct = await ProductsModel.find(findData);
        console.log(findProduct);

        if (findProduct.length === 0) {
            const alternativeFindData = { ProductTitle: { $regex: `^${searchquery.name}`, $options: "i" } };
            findProduct = await ProductsModel.find(alternativeFindData);
        }

        if (findProduct.length > 0) {
            res.json({
                status: "search success",
                message: "search ho gya hai",
                data: findProduct
            });
        } else {
            res.json({
                status: "search failed",
                message: "search not Found"
            });
        }

    } catch (err) {
        res.json({
            status: "failed",
            message: "something went wrong",
            error: err
        });
    }
}

exports.uploadProductImages = async function(req, res, next) {
    try {
        const uploadImage = {
            image: req.imagePath,
            ProductId: req.body.ProductId
        };

        const resData = await ImageModel.create(uploadImage);

        if (resData) {
            res.status(201).json({
                status: "success",
                message: "Upload successful",
                image: uploadImage
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Upload failed"
            });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        next(error); // Pass the error to the next middleware for centralized error handling
    }
};

exports.getProductImage = async function(req, res, next) {
    try {
        const id = req.params.id;
        const resData = await ImageModel.aggregate([
            {
                $match: { id: new mongoose.Types.ObjectId(id) } // Assuming id is an ObjectId
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "ProductId",
                    as: "productImg"
                }
            }
        ]);

        if (resData && resData.length > 0) {
            res.json({
                status: "success",
                message: "upload success",
                data: resData
            });
        } else {
            res.json({
                status: "failed",
                message: "No data found"
            });
        }
    } catch (error) {
        console.error(error); // Logging the error can be useful for debugging
        res.json({
            status: "failed",
            message: "An error occurred"
        });
    }
};