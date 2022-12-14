import ProductSchema from "../models/product";
import { cloudinary } from "../cloudinary.config";
// [GET] all product
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const perPage = limit * page - limit;
    const product = await ProductSchema.find({
      name: { $regex: search, $options: "i" },
      categories: { $regex: category, $options: "i" },
    })
      .skip(perPage)
      .limit(limit);
    const total = await ProductSchema.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const totalPage = Math.ceil(total / limit);
    return res.status(200).json({
      data: product,
      total,
      totalPage,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] product by id
const getProductById = async (req, res) => {
  try {
    const id = req.query.listId;
    const listId = id.split(",");
    const product = await ProductSchema.find()
      .where("_id")
      .in([...listId]);
    res.status(200).json({
      data: product,
    });
  } catch (error) {}
};
// [GET] product by id
const getProductByIds = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: ""
    });
  }
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
      messsage: "Kh??ng update ???????c s???n ph???m",
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
      message: "th??m th??nh c??ng",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messsage: "Kh??ng th??m ???????c s???n ph???m",
      error,
    });
  }
};
// [DELETE] add new product
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "X??a kh??ng th??nh c??ng", error });
  }
};
export { getAll, update, add, getProductById, remove, getProductByIds };
