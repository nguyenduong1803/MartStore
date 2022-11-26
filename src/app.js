import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jSDoc";
import productRoute from "./route/product.route";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoute from "./route/auth.route";
import authsRoute from "./route/auths.route";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
// nhúng
const app = express();
app.use(cors())
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./route/*.js", "./controllers/*.js", "./models/*.js"],
};
mongoose
  .connect("mongodb://localhost:27017/a")
  .then(() => console.log("ket nối database thành công"))
  .catch((err) => console.log("kết nối database thất bại",err));

app.use(express.json());
morgan("tiny");
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3002"],
//   })
// );

app.use("/api", productRoute);
app.use("/api", authRoute);
app.use("/api", authsRoute);
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.listen(process.env.PORT || 3000, () => {
  console.log("server start PORT: ", process.env.PORT);
});
