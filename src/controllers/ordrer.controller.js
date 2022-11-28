import OrderShema from "../models/order";


// [GET] all order
const getAll = async (req, res) => {
  try {
    const order = await OrderShema.find();
    res.status(200).json({
      data: order,
    });
    console.log(order)
  } catch (error) {
    console.log(error);
  }
};
// [GET] order by id
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
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
/**
 * @swagger
 * /api/order/add:
 *  post:
 *   tags: [orders]
 *   summary: Tạo sản phẩm mới
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       $ref: '#/components/schemas/orders'
 *   responses:
 *    200:
 *     description: Tạo sản phẩm thành công
 *    400:
 *     description: Tạo sản phẩm không thành công
 */

// [POST] add new order
const add = async (req, res) => {
  const body = req.body;
  try {
    const order = await new OrderShema(body).save();
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
const remove = async(req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    const order =await OrderShema.deleteOne({_id:id});
    res.status(200).json({ message: "Success", order});
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Xóa không thành công",error});
  }
};
export { getAll, update, add, getOrderById, remove };
