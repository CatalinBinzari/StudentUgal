const mongoose = require("mongoose"); //object modeling for node.js OMT
const contactSchema = mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
            unique: 1,
            maxlength: 100,
        },
        email: {
            required: true,
            type: String,
            unique: 1,
            maxlength: 100,
        },
        subject: {
            required: true,
            type: String,
            unique: 1,
            maxlength: 100,
        },
        message: {
            required: true,
            type: String,
            unique: 1,
            maxlength: 1000,
        },
    },
    { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };