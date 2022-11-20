import mongoose from "mongoose";
import bcrypt from "bcrypt";
const AuthSchema = mongoose.Schema(
  {
    username: {
      type: String,
      minLenght: 6,
      maxLength: 255,
      required: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
AuthSchema.pre("save", function (next) {
  this.password = this.comparePassword(this.password);
  next();
});
AuthSchema.methods = {
  comparePassword(password) {
    if (!password) return;
    return bcrypt.compareSync(password, this.password);
  },
};
export default mongoose.model("auth", AuthSchema);
