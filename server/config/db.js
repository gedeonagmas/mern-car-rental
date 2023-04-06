const mongoose = require("mongoose");
// const uri = "mongodb+srv://user:test123@cluster0.rhayeki.mongodb.net/CAR-RENTAL?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/CAR";
async function mongodb() {
  await mongoose.connect(uri, { useNewUrlParser: false });
  console.log("___________database connected___________");
}
mongodb().catch((err) => console.log(err.message));

module.exports = mongoose;
