const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
import webp from "webp-converter"

cloudinary.config({
  cloud_name: "duongnguyen1803",
  api_key: "727454185374285",
  api_secret: "tF2errPqSUWYb8_GRNXgL0jSU2I",
});
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const checkFileType = (file, cb) => {
  const requireMimetype = "image/jpeg";
  const checkMimeType = file.mimetype == requireMimetype ? true : false;
  if (checkMimeType) {
      webp.cwebp(file.originalname, "output.webp", "-q 80", function (status) {
      });
      return cb(null, true)
  } else {
      cb("Error:Only jpg images are allowed.")
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(req.body.file, cb);
  },
}).single("image");


const fileUploader = multer({ storage });
export { fileUploader,upload ,cloudinary};
