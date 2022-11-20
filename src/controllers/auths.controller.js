import Auth from "../models/user";
import Joi from "joi";
const login = async (req, res) => {
  try {
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
      //   .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
    isAdmin: Joi.boolean(),
    phone: Joi.number(),
  });
  return rule.validate(data);
};

const register = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    // const rule = await validate(body);
    // console.log(rule);
    // if (rule.error) {
    //   return res
    //     .status(422)
    //     .json({ message: "register failed", error: rule.error.details });
    // }
    // const existUser = await Auth.findOne({ email: body.email });
    // console.log(existUser);
    // if (existUser) {
    //   return res.status(400).json({ message: "Email đã tồn tại", error });
    // }
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

export { register, login,authorization };
