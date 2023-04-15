const { validationResult } = require("express-validator");
const { Signup } = require("./../models/signupModel");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  const { firstName, lastName, email, address, phone, password } = req.body;
  await Signup.create({
    firstName,
    lastName,
    email,
    address,
    phone,
    profilePic: req.files.profilePic === undefined ? undefined : req.files.profilePic[0]?.path,
    password,
  });
  return res.status(200).json({ message: "account created successfully" });
};
