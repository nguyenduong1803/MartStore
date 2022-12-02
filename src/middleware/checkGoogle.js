import admin from "../helpers/serviceAccount";
const checkGoogle = async (res,token) => {
  try {
    const decode = await admin.auth().verifyIdToken(token);
    if (!decode) {
      return res.status(400).json({ message: "decode fail" });
    }
    return res.status(200).json({ data: decode });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "google token wrong" });

  }
};
export default checkGoogle;
