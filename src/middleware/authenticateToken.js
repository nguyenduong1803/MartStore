import jwt from "jsonwebtoken";
import checkGoogle from "./checkGoogle";
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const type = req.body;
    if (!authHeader) {
      res.status(400).json({ message: "token is required" });
      return;
    }
    const token = authHeader && authHeader.split(" ")[1];
    if (type !== "registed") {
      checkGoogle(res, token);
    }
    if (token === null || !token) {
      return res.status(400);
    }
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "token wrong" });
      }
      const getUser = user._doc;
      const { password, ...data } = getUser;
      res.status(200).json({ data });
    });
  } catch (error) {
    console.log("error here", error);
  }
  next();
};
export default verifyToken;
