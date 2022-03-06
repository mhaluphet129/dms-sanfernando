let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    civilstatus: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    spousename: {
      type: String,
      required: false,
    },
    typeofclient: {
      type: String,
      required: true,
    },
    stock: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
