const mongoose = require("mongoose");

const subsriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: false,
      trim: true, //"  hello", or "hello ", or "  hello ", would end up being saved as "hello"
      unique: 1, //true
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model("Subscriber", subsriberSchema);

module.exports = { Subscriber };
