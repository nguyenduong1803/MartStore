const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    describe: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    images: [],
    comment: [
      {
        user: String,
        cmt: String,
        time: Date,
      },
    ],
    categories: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    timeCreate: { type: String, default: new Date().toLocaleString() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", ProductSchema);
