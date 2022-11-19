import Auth from "../models/auth";
import bcrypt from "bcrypt";
import Joi from "joi";
const login = async (req, res) => {
  try {
  } catch (error) {
    res.status(200).json({ message: "Login failed", error });
  }
};

// func Validate register
const registerValidator = (data) => {
  const rule = Joi.object({
    username: Joi.string().min(6).max(225).required(),
    email: Joi.string().min(6).max(225).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
      .required(),
  });
  return rule.validate(data);
};

const register = async (req, res) => {
  try {
    const body = req.body;
    const rule = await registerValidator(body);
    if (rule.error) {
      return res
        .status(422)
        .json({ message: "register failed", error: rule.error.details });
    }
    const existUser = await Auth.findOne({ email: body.email });
    if (existUser) {
      return res.status(400).json({ message: "Email đã tồn tại", error });
    }
    const user = await new Auth(body).save();
    user.password = bcrypt.hashSync(body.password, 10);
    return res.status(200).json({ message: "register success", rule });
  } catch (error) {
    res.status(400).json({ message: "Đăng ký không thành công", error });
  }
};

export { register, login };
