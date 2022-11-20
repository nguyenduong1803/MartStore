const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    product: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carts", CartSchema);
