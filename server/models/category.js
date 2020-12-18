const mongoose = require("mongoose"); //object modeling for node.js OMT
const categorySchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    images: {
      required: false,
      type: Array,
      default: [],
    },
    subcategory: {
      required: false,
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
