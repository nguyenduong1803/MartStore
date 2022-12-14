import BlogSchema from "../models/blog";
import { cloudinary } from "../cloudinary.config";
// [GET] all product
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const perPage = limit * page - limit;
    const product = await BlogSchema.find({
      name: { $regex: search, $options: "i" },
      categories: { $regex: category, $options: "i" },
    })
      .skip(perPage)
      .limit(limit);
    const total = await BlogSchema.countDocuments({
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
    const id = req.params.id;
    const product = await BlogSchema.findOne({ _id: id });
    res.status(200).json({
      data: product,
    });
  } catch (error) {}
};
// [GET] product by id
const getProductByIds = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await BlogSchema.findOne({ _id: id });
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "",
    });
  }
};
// [PUT] update product
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const product = await BlogSchema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", product });
  } catch (error) {
    res.status(400).json({
      message: "Không update được sản phẩm",
    });
  }
};

// [POST] add new product
const add = async (req, res) => {
  try {
    const body = req.body;
    const blog = await new BlogSchema(body).save();
    res.status(200).json({
      data: blog,
      message: "thêm thành công blog",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Không thêm được blog",
      error,
    });
  }
};
// [DELETE] add new product
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await BlogSchema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getProductById, remove, getProductByIds };
