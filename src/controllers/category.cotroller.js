import CategorySchema from "../models/category";

// [GET] all category
const getAll = async (req, res) => {
  try {
    const category = await CategorySchema.find();
    res.status(200).json({
      data: category,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] category by id
const getcategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const category = await CategorySchema.findOne({ _id: id });
    res.status(200).json({
      data: category,
    });
  } catch (error) {}
};
// [PUT] update category
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const category = await CategorySchema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", category });
  } catch (error) {
    res.status(400).json({
      messsage: "Không update được danh mục",
    });
  }
};

// [POST] add new category
const add = async (req, res) => {
  try {
    const body = req.body;
    console.log(body)
    const category = await new CategorySchema(body).save();
    return res.status(200).json({
      data: category,
      message: "thêm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messsage: "Không thêm được danh mục",
      error,
    });
  }
};
// [DELETE] add new category
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const category = await CategorySchema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", category });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getcategoryById, remove };
