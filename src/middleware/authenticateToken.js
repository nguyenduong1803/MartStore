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
      res.status(400);
      return;
    }
    console.log("error here");
    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) {
        res.status(400).json({ message: "token wrong" });
        return;
      }
      const getUser = user._doc;
      const { password, ...data } = getUser;
      console.log("error here");
      res.status(200).json({ data });
    });
  } catch (error) {
    console.log("error", error);
  }
  next();
};
export default verifyToken;
