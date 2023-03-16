const mongoose = require("mongoose")
const validator = require("validator");
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

// skeleton + rules.
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
        minLength: 5,
        maxLength: 150
    },
    phone:{
        type: Number,
        required: true,
        unique: [true, "Duplicate phone number found, please use another phone number."]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate email found, please use another email."],
        validate: [validator.isEmail, "Please enter a  valid email."],
    }
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
const User = mongoose.model("User", UserSchema);

// exported the schema, to be able to use it in controller.
module.exports = {User};
