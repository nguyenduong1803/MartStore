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
    quantity: {
      type: Number,
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

export default mongoose.model("products", ProductSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *   products:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      describe:
 *        type: string
 *      price:
 *        type: number
 *      discount:
 *        type: number
 *      category:
 *        type: string
 *      images:
 *        type: array
 *      comment:
 *       type: array
 *      categories:
 *        type: string
 *      unit:
 *        type: string
 *      status:
 *        type: string
 *    required:
 *     - name
 *     - price
 *     - categories
 *     - unit
 *    example:
 *      id: _fdakfakhfa
 *      name: Product A
 *      describe: Mo ta san pham
 *      price: 200
 *      categories: iphone
 *      unit: unit
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API dành cho Product
 */
