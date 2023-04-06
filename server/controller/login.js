const { Signup } = require("../models/signupModel");
const { tokRes } = require("./tokenGenerator");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Signup.findOne({ email: email, status: "active" }).select("+password");
  if (!email || !password) return res.status(404).json({ msg: "provide email and password" });
  if (!user || !(await user.checkPasswordMatch(password, user.password))) return res.status(404).json({ msg: "invalid email or password" });
  tokRes({ user, res, sc: 200, done: "login successful" });
};
