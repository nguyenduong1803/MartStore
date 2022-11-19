import Product from "../models/product";
const products = [
  { id: 1, name: "Product", price: 222 },
  { id: 2, name: "Product 2", price: 11222 },
  { id: 3, name: "Product 2", price: 300 },
];
// [GET] all product
const getAll = async (req, res) => {
  try {
    const product = await Product.find();
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
    const product = await Product.findOne({ _id: id });
    res.status(200).json({
      data: product,
    });
  } catch (error) {}
};
// [PUT] update product
const update = (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const product = Product.findOneAndUpdate({ _id: id });
  } catch (error) {
    res.status(400).json({
      messsage: "Không update được sản phẩm",
    });
  }
};
// [POST] add new product
const add = async (req, res) => {
  const body = req.body;
  try {
    const product = await new Product(body).save();
    res.status(200).json({
      data: product,
      message: "thêm thành công",
    });
  } catch (error) {
    res.status(400).json({
      messsage: "Không thêm được sản phẩm",
    });
  }
};
// [DELETE] add new product
const remove = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = Product.deleteOne({ _id: id });
    res.status(200).json({ messsage: "Xóa thành công", product });
  } catch (error) {
    res.status(400).json({ messsage: "Xóa không thành công" });
  }
};
export { getAll, update, add, getProductById, remove };
