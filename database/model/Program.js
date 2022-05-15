let mongoose = require("mongoose");

let ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  inCharge: {
    type: String,
  },
  total: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Program ||
  mongoose.model("Program", ProgramSchema);
