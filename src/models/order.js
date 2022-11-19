const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    name:{
      type:String,
      required: true,
    },
    address:{
      type:String,
      required: true,
    },
    phoneNumber:{
      type:String,
      required: true,
    },
    email:{
      type:String,
    },
    totalMoney:{
      type:Number,
      required: true,
    },
    status:{
      type:Boolean,
      default: false,
    },
    items: [
      { productId: { 
        type: String 
      }, 
          amount: { 
          type: Number, 
          default: 1 
        } },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", OrderSchema);
