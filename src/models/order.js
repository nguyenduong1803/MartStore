const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId:{
      type:Schema.Types.ObjectId,
      ref:"users"
    },
    orderDetailId:{
      type:Schema.Types.ObjectId,
      ref:"orders"
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    totalMoney: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", OrderSchema);
