import jwt from "jsonwebtoken";
import UserSchema from "../models/user";
const checkAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existUser = await UserSchema.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "Email not found"});
    }
    
    console.log(existUser.authenticate(password))
    if (!existUser.authenticate(password)) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = await jwt.sign(
      { email: existUser.email, password: existUser.password },
      process.env.SECRETKEY
    );
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
    return;
  }
  next();
};

export default checkAuth;
