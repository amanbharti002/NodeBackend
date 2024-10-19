const Accountmodel = require('../model/AccountModel')
const sendMail = require("../utils/mail")
const { genPassword, comparePassword } = require("../utils/utils");
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Generate hashed password
    const hashedPassword = genPassword(password);
    // Create signup data
    const signupData = { name, email, password: hashedPassword };

    console.log(signupData);
    // Save the user in the database
    const resdata = await Accountmodel.create(signupData);

    if (resdata) {
      // Sending verification email
      const sendHtml = `
        <html>
          <body>
            <h1>Hello ${resdata.name}</h1>
            <img src="https://th.bing.com/th/id/OIP.pMbaUypN-gfPjxsY6R0gLAHaFj?rs=1&pid=ImgDetMain" alt="Image">
            <a href="http://192.168.1.55:5000/api/v1/verifyAccount/${resdata._id}">Verify your account</a>
            </body>
            </html>`;

      sendMail(resdata.email, "Signup Info", "",sendHtml);

      // Return success response
      res.json({
        status: "success",
        message: "Signup successful! Please verify your account via email.",
        email: resdata.email,
        user_id: resdata._id
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "Invalid details provided."
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      res.status(400).json({
        status: 'failed',
        errors
      });
    } else {
      res.status(409).json({
        status: 'failed',
        message: "Email is already registered!"
      });
    }
  }
};

exports.login = async function (req, res, next) {
  try {
    const loginData = req.body;
    const query = {
      $and:
        [
          { email: loginData.email },
          { account_status: 1 },
        ]
    }
    const resData = await Accountmodel.findOne(query);
    if (resData) {
      if (comparePassword(resData.password, loginData.password)) {
      const payload={
        name:resData.name,
        email:resData.email,
        user_id:resData._id
      }
      const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"30d"})
      console.log(token);
        res.json({
          status: "success",
          name:resData.name,
          message: "Login Successfully",
          token: token
        })
      }
      else {
        res.json({
          status: "failed",
          message: "Your Password is not correct",
        })
      }
    }
    else {
      res.json({
        status: "failed",
        message: "incorrect email or account not verified check your email !",
      })
    }
    
  }
  catch (err) {
    res.json({
      status: "failed",
      message: "something wrong !!",
    })
  }
}



exports.verifyUser = async function (req, res, next) {
  try {
    const query = { _id: req.params.id };
    const resData = await Accountmodel.updateOne(query, { account_status: 1 });
    if (resData) {
      res.json({
        status: "success",
        message: "Account Verified"
      })
    }
    else {
      res.json({
        status: "failed",
        message: "id is not matched",
      })
    }

  }
  catch (err) {
    res.json({
      status: "failed",
      message: "Not verified error",
    })
  }
}
