import { number } from "joi";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema(
  {
    productId:{
      type:Schema.Types.ObjectId,
      ref:"products"
    },
    quantity:{
      type:Number,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", OrderDetailSchema);
