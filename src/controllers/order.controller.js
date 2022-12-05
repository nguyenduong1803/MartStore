import OrderShema from "../models/order";
import { saveMultiple } from "./orderDetail.controller";

// [GET] all order
const getAll = async (req, res) => {
  try {
    const order = await OrderShema.find();
    res.status(200).json({
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] order by id
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderShema.findOne({ _id: id });
    res.status(200).json({
      data: order,
    });
  } catch (error) {}
};
// [PUT] update order
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const order = await OrderShema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", order });
  } catch (error) {
    res.status(400).json({
      messsage: "Không update được hóa đơn",
    });
  }
};

// [POST] add new order
const add = async (req, res) => {
  try {
    const { products, ...body } = req.body;
    const order = await new OrderShema(body).save();
    const newProduct = await products.map((item) => {
      return { ...item, orderId: order._id };
    });
    //fn save multiple order detail
    await saveMultiple(newProduct);
    res.status(200).json({
      data: order,
      message: "thêm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      messsage: "Không thêm được hóa đơn",
      error,
    });
  }
};
// [DELETE] add new order
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderShema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getOrderById, remove };
