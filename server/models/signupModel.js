const mongoose = require("./../config/db");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phone: String,
  password: String,
  confirmPassword: String,
  role: { type: String, default: "user" },
  status: { type: String, default: "active" },
  profilePic: { type: String, default: "profilePic.png" },
});

schema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

schema.methods.checkPasswordMatch = async function (password, candidatePassword) {
  return await bcrypt.compare(password, candidatePassword);
};

exports.Signup = mongoose.model("users", schema);
