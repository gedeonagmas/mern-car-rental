const { Rent } = require("./../models/rentModel");

exports.history = async (req, res, next) => {
  const history = await Rent.find();
  res.status(200).send(history);
};
