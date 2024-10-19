const mongoose = require('mongoose');
const db = require('../db/db'); // Importing the DB configuration
const COLLECTION = require('../db/collection'); // Ensure COLLECTION.customer is properly defined

// Define Customer Schema
const CostomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
            validator: function(v) {
                return v.length >= 4;
            },
            message: "Minimum length should be 4"
        },
        trim: true // Removes extra spaces
    },
    customer_email: {
        type: String,
        required: [true, "Customer email is required"],
        unique: true,
        lowercase: true, // Ensures email is stored in lowercase
        trim: true // Removes extra spaces
    },
    customer_password: {
        type: String,
        required: [true, "Customer password is required"],
        trim: true
    },
    customer_phone: {
        type: String,
        required: [true, "Customer phone number is required"],
        unique: true,
        trim: true
    },
    customer_status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

// Add indexes for unique fields
CostomerSchema.index({ customer_email: 1 }, { unique: true });
CostomerSchema.index({ customer_phone: 1 }, { unique: true });

// Create the model from the schema
const CostomerAccountModel = mongoose.model(COLLECTION.customer, CostomerSchema);

module.exports = CostomerAccountModel;