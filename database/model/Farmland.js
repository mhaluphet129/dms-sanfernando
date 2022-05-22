let mongoose = require("mongoose");

let FarmlandSchema = new mongoose.Schema(
  {
    livelihoodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livelihood",
    },
    location: {
      type: String,
    },
    ownershipDocument: {
      type: String,
    },
    ownerType: {
      type: String,
    },
    ownerName: {
      type: String,
    },
    totalArea: {
      type: Number,
    },
    documentNumber: {
      type: String,
    },
    crops: {
      type: Array,
    },
    livestock: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Farmland ||
  mongoose.model("Farmland", FarmlandSchema);
