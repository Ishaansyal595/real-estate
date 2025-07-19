import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import PropertyRouter from "./routes/propertyRoutes.js";

dotenv.config();
import cloudinary from "./utils/cloudinary.js";

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);

app.use("/api/property", PropertyRouter);

mongoose
  .connect(process.env.MONGODB_CONN)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`server is running on localhost ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
