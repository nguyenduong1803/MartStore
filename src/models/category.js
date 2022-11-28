const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: {
        type:String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("categories", CategorySchema);
