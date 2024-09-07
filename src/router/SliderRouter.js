const express = require("express");
const {AddSlider,getAllSlider} = require('../controller/SliderController');
const upload = require('../middleware/ImageMiddleware');
const SliderRouter = express.Router()

SliderRouter.post("/AddSlider",upload.single("image"),AddSlider);
SliderRouter.get("/getAllSlider",getAllSlider);

module.exports = SliderRouter

