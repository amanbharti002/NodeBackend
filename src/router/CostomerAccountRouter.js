const express = require('express');
const { signup, login, VerifyUser } = require('../controller/CostomerAccountController');


// Initialize the router
const CostomerAccountRouter = express.Router();

// POST request for signup
CostomerAccountRouter.post('/signup', signup);

// POST request for login
CostomerAccountRouter.post('/login', login);

// GET request for account verification (GET is appropriate as it represents fetching/validating an action)
CostomerAccountRouter.get('/verifyAccount/:id',VerifyUser);

module.exports = CostomerAccountRouter;