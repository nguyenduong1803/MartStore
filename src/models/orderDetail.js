const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "orders",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orderDetail", OrderDetailSchema);
