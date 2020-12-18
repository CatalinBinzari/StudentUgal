const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    lastname: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100,
    },
    description: {
      required: true,
      type: String,
      maxlength: 100000,
    },
    email: {
      type: String,
      require: true,
      trim: true, 
      unique: 1, 
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      required: false,
      type: Array,
      default: []
    },
    shipping: {
      required: true,
      type: Boolean,
    },
    publish: {
      required: true,
      type: Boolean,
    },
    images: {
      type: Array,
      default: [],
    },
    media:
    {
      type: Array,
      maxlength: [],
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
