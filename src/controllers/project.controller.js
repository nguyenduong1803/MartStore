import ProjectShema from "../models/project";
// [GET] all project
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const perPage = limit * page - limit;
    const project = await ProjectShema.find({
      name: { $regex: search, $options: "i" },
      categories: { $regex: category, $options: "i" },
    })
      .skip(perPage)
      .limit(limit);
    const total = await ProjectShema.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const totalPage = Math.ceil(total / limit);
    return res.status(200).json({
      data: project,
      total,
      totalPage,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
  }
};
// [GET] project by id
const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await ProjectShema.findOne({ _id: id });
    res.status(200).json({
      data: project,
    });
  } catch (error) {}
};
// [GET] project by id
const getProjectByIds = async (req, res) => {
  try {
    const id = req.query.listId;
    const listId = id.split(",");
    const project = await ProjectShema
      .find()
      .where("_id")
      .in([...listId]);
    res.status(200).json({
      data: project,
    });
  } catch (error) {}
};
// [PUT] update project
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const project = await ProjectShema.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({ message: "update success", project });
  } catch (error) {
    res.status(400).json({
      message: "Không update được sản phẩm",
    });
  }
};

// [POST] add new project
const add = async (req, res) => {
  try {
    const body = req.body;
    const blog = await new ProjectShema(body).save();
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
// [DELETE] add new project
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await ProjectShema.deleteOne({ _id: id });
    res.status(200).json({ message: "Success", project });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Xóa không thành công", error });
  }
};
export { getAll, update, add, getProjectByIds, remove, getProjectById };
