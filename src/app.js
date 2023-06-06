import express from "express";
import swaggerUI from "swagger-ui-express";
import productRoute from "./route/product.route";
import morgan from "morgan";
import mongoose from "mongoose";
import authsRoute from "./route/users.route";
import categoryRoute from "./route/category.route";
import blogRouter from "./route/blog.route";
import orderRoute from "./route/order.route";
import projectRoute from "./route/project.route";
import taskRoute from "./route/task.route";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// nhúng
const dbUrl = process.env.ATLAS_URL
const clientUrl = process.env.CLIENT_URL
const app = express();
app.use(cors());

mongoose
  .connect(dbUrl)
  .then(() => console.log("ket nối database thành công"))
  .catch((err) => console.log("kết nối database thất bại", err));

morgan("tiny");
app.use(
  cors({
    credentials: true,
    origin: [clientUrl],
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", productRoute);
app.use("/api", authsRoute);
app.use("/api", categoryRoute);
app.use("/api", orderRoute);
app.use("/api", blogRouter);
app.use("/api", projectRoute);
app.use("/api", taskRoute);
app.listen(process.env.PORT || 3000, () => {
  console.log("server start PORT: ", process.env.PORT);
});
