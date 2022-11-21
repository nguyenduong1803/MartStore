import dotenv from "dotenv";

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    console.log(req.file)
    cb(null, file.originalname);
  },
});

const uploadCloud = multer({ storage });

export  {uploadCloud};
