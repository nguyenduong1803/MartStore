import TaskShema from "../models/task";
// [GET] all task
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const projectId = req.query.projectId || "";
    const perPage = limit * page - limit;
    const task = await TaskShema.find({ projectId }).skip(perPage).limit(limit);
    const total = await TaskShema.countDocuments({
      projectId,
    });
    const totalPage = Math.ceil(total / limit);
    return res.status(200).json({
      data: task,
      total,
      totalPage,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] task by id
const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskShema.findOne({ projectId: id });
    res.status(200).json({
      data: task,
    });
  } catch (error) {}
};
// [GET] task by id
const getTaskByIds = async (req, res) => {
  try {
    const id = req.query.listId;
    const listId = id.split(",");
    const task = await TaskShema.find()
      .where("_id")
      .in([...listId]);
    res.status(200).json({
      data: task,
    });
  } catch (error) {}
};
// [PUT] update task
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const task = await TaskShema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", task });
  } catch (error) {
    res.status(400).json({
      message: "Không update được sản phẩm",
    });
  }
};

// [POST] add new task
const add = async (req, res) => {
  try {
    const body = req.body;
    const blog = await new TaskShema(body).save();
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
// [DELETE] add new task
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await TaskShema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", task });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getTaskByIds, remove, getTaskById };
