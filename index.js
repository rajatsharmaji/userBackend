import express from "express";
import dotenv from "dotenv";
import conn from "./dbConnection.js";
import userRoutes from "./user/user.routes.js";
import pageRoutes from "./pages/page.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

conn();

app.use("/", userRoutes);
app.use("/", pageRoutes);

app.listen(PORT, () => {
  console.log(`server is listening at PORT ${PORT}`);
});
