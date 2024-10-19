const CostomerAccountmodel = require('../model/CostomerAccountModel');
const sendMail = require("../utils/mail");
const { genPassword, comparePassword } = require("../utils/utils");
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.signup = async function (req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Generate hashed password (assuming genPassword is async)
    const hashedPassword = await genPassword(password);

    // Create signup data
    const signupData = { name, email, password: hashedPassword };

    // Save the user in the database
    const resdata = await CostomerAccountmodel.create(signupData);

    if (resdata) {
      // Sending verification email
      const sendHtml = `
        <html>
          <body>
            <h1>Hello ${resdata.name}</h1>
            <img src="https://th.bing.com/th/id/OIP.pMbaUypN-gfPjxsY6R0gLAHaFj?rs=1&pid=ImgDetMain" alt="Image">
            <a href="http:// 192.168.1.55:5000/api/v1/verifyAccount/${resdata._id}">Verify your account</a>
          </body>
        </html>`;

      // Sending verification mail
      await sendMail(resdata.email, "Signup Info", "", sendHtml);

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
    } else if (error.code === 11000) { // Handle duplicate email error (MongoDB error code 11000)
      res.status(409).json({
        status: 'failed',
        message: "Email is already registered!"
      });
    } else {
      res.status(500).json({
        status: 'failed',
        message: "Internal server error"
      });
    }
  }
};

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const query = {
      $and: [
        { email },
        { account_status: 1 } // Ensure the account is verified
      ]
    };

    // Find the user by email and account status
    const resData = await CostomerAccountmodel.findOne(query);
    if (resData) {
      const passwordMatches = await comparePassword(password, resData.password); // Assuming comparePassword is async
      if (passwordMatches) {
        const payload = {
          name: resData.name,
          email: resData.email,
          user_id: resData._id
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "30d" });
        console.log(token);

        res.json({
          status: "success",
          name: resData.name,
          message: "Login Successfully",
          token: token // You might want to set this as an HTTP-only cookie
        });
      } else {
        res.status(401).json({
          status: "failed",
          message: "Incorrect password."
        });
      }
    } else {
      res.status(404).json({
        status: "failed",
        message: "Incorrect email or account not verified. Check your email!"
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong!"
    });
  }
};

exports.VerifyUser = async function (req, res, next) {
  try {
    const query = { _id: req.params.id };

    // Update account status to verified
    const resData = await CostomerAccountmodel.updateOne(query, { account_status: 1 });

    if (resData.modifiedCount > 0) { // Check if the document was actually updated
      res.json({
        status: "success",
        message: "Account Verified"
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "ID not found or already verified."
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Verification error"
    });
  }
};