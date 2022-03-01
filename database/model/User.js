let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
