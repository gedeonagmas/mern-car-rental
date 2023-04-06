const { Car } = require("../models/carModel");
const { Rent } = require("../models/rentModel");

exports.rentCar = async (req, res, next) => {
  const { firstName, lastName, email, address, phone, profilePic, carPhoto, model, mark, price, pickDate, dropDate, pickTime, dropTime, id } = req.body;

  const data = await Car.find({ _id: req.body.id });
  data[0].status = "Taken";
  await data[0].save();
  await Rent.create({
    firstName,
    lastName,
    email,
    address,
    phone,
    profilePic,
    carPhoto,
    model,
    mark,
    price,
    pickDate,
    dropDate,
    dropTime,
    pickTime,
    carId: id,
  });
  res.status(200).json({ message: "car booked successfully" });
};
