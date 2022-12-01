import admin from "../helpers/serviceAccount";
const checkGoogle = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("render");
    const decode = await admin.auth().verifyIdToken(token);

    if (!decode) {
      return res.status(400).json({ message: "decode fail" });
    }
    return res.status(200).json({ data: decode });
    next();
    
  } catch (error) {}
};
export default checkGoogle;
