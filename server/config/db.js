const mongoose = require("mongoose");

// const uri =
//   "mongodb+srv://user2:llR5cnBwy2amBzYn@cluster0.rhayeki.mongodb.net/CAR?retryWrites=true&w=majority&replicaSet=test&ssl=true";
const uri =
  "mongodb://user2:llR5cnBwy2amBzYn@ac-walbciw-shard-00-00.rhayeki.mongodb.net:27017,ac-walbciw-shard-00-01.rhayeki.mongodb.net:27017,ac-walbciw-shard-00-02.rhayeki.mongodb.net:27017/?ssl=true&replicaSet=atlas-m5db59-shard-0&authSource=admin&retryWrites=true&w=majority";
async function mongodb() {
  await mongoose.connect(uri, { useNewUrlParser: true });
  console.log("___________database connected___________");
}
mongodb().catch((err) => console.log(err));

module.exports = mongoose;
