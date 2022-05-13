let mongoose = require("mongoose");

let FarmlandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livelihood",
    },
    farmLand: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Farmland ||
  mongoose.model("Farmland", FarmlandSchema);
