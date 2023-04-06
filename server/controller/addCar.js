const { Car } = require("./../models/carModel");

exports.addCar = async (req, res, next) => {
  const { model, mark, price, ac, door, transmission, fuel, year } = req.body;
  if (!model || !mark || !price || !ac || !door || !transmission || !fuel || !req.files.carPhoto) {
    return res.status(400).send("please fill out the form correctly");
  }
  await Car.create({
    carPhoto: req.files.carPhoto[0].path.toString().split("\\")[1],
    model,
    mark,
    price,
    ac,
    door,
    transmission,
    fuel,
    year,
  });
  return res.status(200).json({ message: "car added successfully" });
};
