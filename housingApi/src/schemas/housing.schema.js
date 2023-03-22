const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// skeleton + rules.
const HousingSchema = new Schema({
    location: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 150
    },
    bedrooms: {
        type: Number,
        required: false,
        default: ''
    },
    category: {
        type: String, 
        required: true,
        default:'1BHK'
    },
    price: {
        type: Number,
        required: true,
        default: ''
    },
}, {
    timestamps: true,
    versionKey: false,
});

/**
 * timestamps: true
 * it enabled two features.
 * 1. createdAt
 * 2. updatedAt
 */

// now we have to make a table aka Collection.
const Housing = mongoose.model("Housing", HousingSchema);

// exported the schema, to be able to use it in controller.
module.exports = {Housing};
