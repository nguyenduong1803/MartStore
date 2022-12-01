import ProductSchema from "../models/product";
import { cloudinary } from "../cloudinary.config";
// [GET] all product
const getAll = async (req, res) => {
  try {
    const product = await ProductSchema.find();
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] product by id
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await ProductSchema.findOne({ _id: id });
    res.status(200).json({
      data: product,
    });
  } catch (error) {}
};
// [PUT] update product
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { file, ...rest } = req.body;
    const fileImage = await cloudinary.uploader.upload(file, {
      upload_preset: "devs_setup",
    });
    const body = { ...rest, images: [fileImage.secure_url] };
    const product = await ProductSchema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", product });
  } catch (error) {
    res.status(400).json({
      messsage: "Không update được sản phẩm",
    });
  }
};

// [POST] add new product
const add = async (req, res) => {
  try {
    const { file, ...rest } = req.body;
    const fileImage = await cloudinary.uploader.upload(file, {
      upload_preset: "devs_setup",
    });
    const body = { ...rest, images: [fileImage.secure_url] };
    const product = await new ProductSchema(body).save();
    res.status(200).json({
      data: product,
      message: "thêm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messsage: "Không thêm được sản phẩm",
      error,
    });
  }
};
// [DELETE] add new product
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await ProductSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getProductById, remove };
