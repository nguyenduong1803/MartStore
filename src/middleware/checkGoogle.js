import admin from "../helpers/serviceAccount";
const checkGoogle = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const decode =await admin.auth().verifyIdToken(token);
console.log(decode)
    if (!decode) {
      return res.status(400).json({ message: "decode fail" });
    }
    decode.then((res) => {
      console.log(res);
    });
    next();
  } catch (error) {}
};
export default checkGoogle;
