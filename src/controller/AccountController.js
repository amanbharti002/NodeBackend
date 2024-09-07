const Accountmodel = require("../model/Accountmodel");
const sendMail = require("../utils/Mail.js");
const {genPassword,comparePassword} = require("../utils/Utils.js");
require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.signup = async function(req,res,next){
    try{
        const signupdata ={
            name:req.body.name,
            email:req.body.email,
            password:genPassword(req.body.password)
        }
        console.log(signupdata)
        const resdata = await Accountmodel.create(signupdata)  

        if(resdata){
            const sendHtml = `<html>
            <body>
            <h1>Hello Friends${resdata.name}</h1>
            <a href="http://192.168.0.3:4040/api/v1/auth/verifyAccount/${resdata._id}">verify account</a>


            </html>
            </body>

            `
            sendMail(resdata.email,"Signup info","",sendHtml)

            res.json({
                status: "success",
                message: "signup successfully and please verify your account on email",
                email: resdata.email,
                user_id: resdata._id
              })

        }
        else{
            res.json({
                status: "failed",
                message: "invalid details",
              })

        }
    }
    catch(erroe){
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
            res.json({
              status: 'failed',
              error: errors
            })
          }
          else {
            res.json({
              status: 'failed',
              message: "email is already registerd !"
            })
          }
      
    }
   
}