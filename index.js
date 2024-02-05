import express from "express";
import conn from "./dbConnection.js";
import userRoutes from "./user/user.routes.js";
import pageRoutes from "./pages/page.routes.js";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
conn();

app.use("/user", userRoutes);
app.use("/page", pageRoutes);

app.listen(PORT, () => {
  console.log(`server is listening at PORT ${PORT}`);
});
