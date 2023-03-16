const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// skeleton + rules.
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 150
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    author: {
        type: Schema.Types.ObjectId, // this is foegin key
        ref: 'User', // this is the collection that populate uses.
        required: true,
    },
    deadline: {
        type: Date,
        required: false,
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
const Todo = mongoose.model("Todo", TodoSchema);

// exported the schema, to be able to use it in controller.
module.exports = {Todo};
