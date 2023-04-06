const { Car } = require("./../models/carModel");

exports.getAllCars = async (req, res, next) => {
  if (req.query.type === "user") {
    const car = await Car.find({ active: true });
    return res.status(200).send(car);
  } else if (req.query.type === "admin") {
    const car = await Car.find();
    return res.status(200).send(car);
  }
};
