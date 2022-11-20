const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import Joi from "joi";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// UserSchema.pre("save", function (next) {
//   bcryptPassword(this.password);
//   console.log("password changed")
//   next();
// });
UserSchema.pre("save", function (next) {
  console.log("save");
  this.password = this.bcryptPassword(this.password);
  next();
});
UserSchema.methods = {
  // compare password
  bcryptPassword(password) {
    console.log(bcrypt.hashSync(password, 10));
    if (!password) return "";
    return bcrypt.hashSync(password, 10);
  },
  authenticate(password) {
    console.log("login passs",this.bcryptPassword(password))
    console.log("old pass",this.password)
    return bcrypt.compareSync(password,this.password)
  },
  // handle validate user
  // async validate(data) {
  //   const rule = Joi.object({
  //     fullname: Joi.string().min(6).max(225).required(),
  //     email: Joi.string().min(6).max(225).required(),
  //     password: Joi.string()
  //       .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
  //       .required(),
  //     isAdmin: Joi.boolean(),
  //     phone: Joi.number(),
  //   });
  //   return await rule.validate(data);
  // },
};

export default mongoose.model("users", UserSchema);
