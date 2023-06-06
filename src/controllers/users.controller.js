import Auth from "../models/user";
import Joi from "joi";
const login = async (req, res) => {
  try {
    res.status(200).json({ message: "Login success", error });
  } catch (error) {
    res.status(200).json({ message: "Login failed", error });
  }
};

// func Validate register
const validate = (data) => {
  const rule = Joi.object({
    fullname: Joi.string().min(6).max(225).required(),
    email: Joi.string().min(6).max(225).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
    isAdmin: Joi.boolean(),
    phone: Joi.number(),
  });
  return rule.validate(data);
};

const register = async (req, res) => {
  try {
    const body = req.body;
    const user = await new Auth(body).save();
    return res.status(200).json({ message: "register success", user });
  } catch (error) {
    res.status(400).json({ message: "Đăng ký không thành công", error });
  }
};
const authorization = () => {
  try {
  } catch (error) {
    res.status(200).json({ message: "wrong Token", error });
  }
};
// [GET] all project
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const perPage = limit * page - limit;
    const project = await Auth.find({
      name: { $regex: search, $options: "i" },
    })
      .skip(perPage)
      .limit(limit);
    const total = await Auth.countDocuments({
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
export { register, login, authorization, getAll };
