import { cloudinary } from "../cloudinary.config";
const uploadCloudinary = async (req, res, next) => {
  console.log(req.body);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  const res = await cloudinary.uploader.upload(req.body.base64, {
    upload_present: "dev_setups",
  });
  return res.json({ secure_url: req.file.path });
};
export default uploadCloudinary;
