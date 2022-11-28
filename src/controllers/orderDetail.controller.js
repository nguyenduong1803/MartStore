import OrderDetailSchema from "../models/orderDetail";

// [GET] all order
const getAll = async (req, res) => {
  try {
    const order = await OrderDetailSchema.find();
    res.status(200).json({
      data: order,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] order by id
const getOrderDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const order = await OrderDetailSchema.findOne({ _id: id });
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
    const order = await OrderDetailSchema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", order });
  } catch (error) {
    res.status(400).json({
      messsage: "Không update được sản phẩm",
    });
  }
};

// [POST] add new order
const add = async (req, res) => {
  const body = req.body;
  try {
    const order = await new OrderDetailSchema(body).save();
    res.status(200).json({
      data: order,
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
// [DELETE] add new order
const remove = async(req, res) => {

  try {
    const id = req.params.id
    console.log(id)
    const order =await OrderDetailSchema.deleteOne({_id:id});
    res.status(200).json({ message: "Success", order});
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Xóa không thành công",error});
  }
};
const saveMultiple = async(data) => {
  if(!Array.isArray(data)) return
  OrderDetailSchema.collection.insert(data, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
}
export { getAll, update, add, getOrderDetailById, remove,saveMultiple };
