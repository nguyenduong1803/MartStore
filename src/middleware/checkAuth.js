import jwt from "jsonwebtoken";
import AuthSchema from "../models/auth";
const checkAuth = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await AuthSchema.findOne({ username, password });
    if (!user) {
      res
        .status(400)
        .json({ message: "username or password not found", user });
      return;
    }
    const token = await jwt.sign(
      { username: user.username, password: user.password },
      "keyyy"
    );
    res.status(200).json({ message: "Login success", token });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
    return;
  }
  next();
};

export default checkAuth;
