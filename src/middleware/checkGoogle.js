import admin from "../helpers/serviceAccount";
const checkGoogle = async (res, token) => {
  try {
    const user = await admin.auth().verifyIdToken(token);
    if (!user) {
      return res.status(400).json({ message: "decode fail" });
    }
    const newUser = {
      fullname: user.name,
      email: user.email,
      isAdmin: false,
      updatedAt: "",
      phone: "",
      _id: user.user_id,
    };
    return res.status(200).json({ data: newUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "google token wrong" });
  }
};
export default checkGoogle;
