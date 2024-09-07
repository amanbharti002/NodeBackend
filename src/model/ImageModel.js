require('../db/db'); // Ensure the database connection is established
const mongoose = require("mongoose");
const COLLECTION = require("../db/collection");
const {ObjectId} =require("mongodb")
const ImageSchema = new mongoose.Schema(
    {
        ProductId: { type:ObjectId, required: [true] },
        image: { type: String, required: [true] },
    },
    {
        timestamps: true // Optional: Adds createdAt and updatedAt fields automatically
    }
);

const ImageModel = mongoose.model(COLLECTION.ProductImage, ImageSchema);

module.exports = ImageModel;