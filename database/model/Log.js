let mongoose = require("mongoose");

let LogsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    barangay: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Logs || mongoose.model("Logs", LogsSchema);
