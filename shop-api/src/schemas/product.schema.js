const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// skeleton + rules.
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // remove space from front and back,
        lowercase: true, // convert the name to lowercase before saving
        minLength: 3, // specify the minimum length of the attribute.
        maxLength: 100, // specify the maximum length of the attribute.
    },
    price: {
        type: Number,
        required: false,
        min: 0, // minimum value
        max: 100000, // maximum value of the attribute, applicable for type -> number.
        default: 0, // deafult value of the attribute
    },
})

// now we have to make a table aka Collection.
const Product = mongoose.model("Product", productSchema);

// exported the schema, to be able to use it in controller.
module.exports = {Product};
