let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "admin",
      required: true,
    },
    timeline: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
