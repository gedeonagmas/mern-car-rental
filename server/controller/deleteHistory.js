const { Rent } = require("./../models/rentModel");

exports.deleteHistory = async (req, res, next) => {
  await Rent.deleteOne({ _id: req.body.id });
  res.status(201).send("history deleted");
};
