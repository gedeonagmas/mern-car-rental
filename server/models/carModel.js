const mongoose = require("./../config/db");

const schema = new mongoose.Schema({
  carPhoto: String,
  mark: String,
  price: Number,
  ac: String,
  model: String,
  door: String,
  transmission: String,
  fuel: String,
  year: String,
  active: { type: Boolean, default: true },
  status: { type: String, default: "available" },
});

exports.Car = mongoose.model("car", schema);
