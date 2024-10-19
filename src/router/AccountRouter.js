const express = require('express')
const{signup,login,verifyUser} = require('../controller/AccountController')

const AccountRouter = express.Router()

AccountRouter.post('/signup',signup);
AccountRouter.post('/login',login);
AccountRouter.get("/verifyAccount/:id",verifyUser);

module.exports = AccountRouter
