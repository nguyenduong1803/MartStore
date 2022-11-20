import express from "express";
import productRoute from "./route/product.route";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoute from "./route/auth.route";
import authsRoute from "./route/auths.route";
import dotenv from "dotenv";

dotenv.config();

// nhúng
const app = express();
mongoose
  .connect("mongodb://localhost:27017/smartStore")
  .then(() => console.log("ket nối database thành công"))
  .catch(() => console.log("kết nối database thất bại"));

app.use(express.json());
morgan("tiny");
app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", authsRoute);

app.listen(process.env.PORT||3000, () => {
  console.log("server start PORT: ",process.env.PORT);
});
