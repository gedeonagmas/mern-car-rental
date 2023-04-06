const express = require("express");
require("express-async-catch");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({ origin: "https://mern-car-rental-backend-49jgiu48k-gedeonagmas.vercel.app" }));
app.use(express.json());
app.use("/user", userRouter);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("server disconnected", err);
  }
  console.log(`server connected on port ${process.env.PORT}`);
});
