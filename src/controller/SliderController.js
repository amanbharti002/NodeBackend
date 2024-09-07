const SliderModel = require("../model/SliderModel")
exports.AddSlider = async function(req,res,next){
    try{
        const data ={
            image:req.imagePath
        }
        // console.log("image",data)
        const resData = await SliderModel.create(data)
        console.log(resData)
        if(resData){
            res.json({
                status:"success",
                message:"slider add successfully",
                sliderData :resData
            })
        }
        else{
            res.json({
                status:"failed",
                message:"unable to add data"
            })
        }

    }
    catch(error){
        res.json({
            status:"failed",
            message:"something went wrong"
        })
    }
}

//get slider image

exports.getAllSlider = async function (req,res,next){
    try{
        const getSlider = await SliderModel.find({});
       
        if(getSlider){
            res.json({
                status:"success",
                message:"slider find successfully",
                
            })

        }
        else{
            res.json({
                status:"failed",
                message:"unable to find data"
            })

        }

    }
    catch(error){
        res.json({
            status:"failed",
            message:"something went wrong",
            error:error
        })

    }
}

// delete slider

exports.deleteSlider = async function(req,res,next){
    try{
        const query = {_id:req.params.id}
        const resDelete = await SliderModel.deleteOne(query)
        console.log(resDelete)
        if(resDelete){
            res.json({
                status: "success",
                message: "delete products"
            })
        }

        else{
            res.json({
                status: "failed",
                message: "something went wrong verify your data"
            })
        }

    }
    catch(error){
        res.json({
            status: "failed",
            message: "something went wrong"

        })

    }
}