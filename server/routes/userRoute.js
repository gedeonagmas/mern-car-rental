const { upload } = require("../config/upload");
const express = require("express");
const nodemailer = require("nodemailer");
const { signup } = require("./../controller/signup");
const { userValidator } = require("../utils/validator");
const { login } = require("../controller/login");
const { addCar } = require("../controller/addCar");
const { protect } = require("../middleware/auth");
const { getAllCars } = require("../controller/getAllCars");
const { rentCar } = require("../controller/rentCar");
const { getUsers } = require("../controller/getUsers");
const { freeze } = require("../controller/userActive");
const { history } = require("../controller/getHistory");
const { deleteHistory } = require("../controller/deleteHistory");
const userRouter = express.Router();
const files = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "carPhoto", maxCount: 1 },
]);

userRouter.post("/register", files, userValidator, signup);
userRouter.post("/login", login);
userRouter.post("/add/car", files, protect, addCar);
userRouter.get("/get/all/cars", getAllCars);
userRouter.get("/get/all/users", getUsers);
userRouter.post("/rent/car", protect, rentCar);
userRouter.get("/get/history", history);
userRouter.delete("/delete/history", protect, deleteHistory);
userRouter.patch("/freeze/active/user", protect, freeze);

//send email
userRouter.post("/send/email", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 466,
    secure: true,
    auth: {
      user: "gedeonagmas2580@gmail.com",
      pass: "esvuiygdgxgnjwwp",
    },
  });

  const mailOptions = {
    from: `FROM YOUR CAR RENTAL APP <gedeonagmas2580@gmail.com>`,
    to: "gedeonagmas2580@gmail.com",
    text: `from: ${req.body.email}
      name: ${req.body.name}
      message: ${req.body.message},
    `,
    subject: "FROM YOUR CAR RENTAL",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return res.status(200).json({
        message: "connection problem unable to send email please try again!",
      });
    } else {
      return res.status(200).json({ message: "Your Email is Sent Successfully Thank You!!!" });
    }
  });
});

module.exports = userRouter;
