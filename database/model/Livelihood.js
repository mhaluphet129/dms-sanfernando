let mongoose = require("mongoose");

let nameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  extensionName: {
    type: String,
  },
});

let addressSchema = new mongoose.Schema({
  region: {
    type: String,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  barangay: {
    type: String,
  },
  street: {
    type: String,
  },
  house: {
    type: String,
  },
});

let birthSchema = new mongoose.Schema({
  dateOfBirth: {
    type: String,
  },
  placeOfBirth: {
    type: String,
  },
});

let civilSchema = new mongoose.Schema({
  civilStatus: {
    type: String,
    required: true,
  },
  spouseName: {
    type: String,
  },
});

let houseHoldSchema = new mongoose.Schema({
  isHead: {
    type: Boolean,
  },
  nameOfHead: {
    type: String,
  },
  relationship: {
    type: String,
  },
  numberOfLiving: {
    type: Number,
  },
  numOfMale: {
    type: String,
  },
  numOfFemale: {
    type: String,
  },
});

let ethnicitySchema = new mongoose.Schema({
  isIp: {
    type: Boolean,
  },
  nameOfEthnicity: {
    type: String,
  },
});

let governmentSchema = new mongoose.Schema({
  hasId: {
    type: Boolean,
  },
  idNum: {
    type: String,
  },
});

let emergencySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
  },
});

// let profileSchema = new mongoose.Schema({
//   type: {
//     type: Array,
//   },
//   grossIncomeLastYear: {
//     type: String,
//   },
// });

let livelihoodSchema = new mongoose.Schema(
  {
    name: nameSchema,
    sex: {
      type: String,
    },
    contactNum: {
      type: String,
    },
    religion: {
      type: String,
      required: true,
    },
    motherMaidenName: {
      type: String,
    },
    highestEducation: {
      type: String,
    },
    isDisabledPerson: {
      type: Boolean,
    },
    is4Ps: {
      type: Boolean,
    },
    hasCoopOrAssoc: {
      type: Boolean,
    },
    address: addressSchema,
    birth: birthSchema,
    civil: civilSchema,
    household: houseHoldSchema,
    ethnicity: ethnicitySchema,
    government: governmentSchema,
    emergency: emergencySchema,
    // profile: profileSchema,
  },
  { timestamps: true }
);

export default mongoose.models.Livelihood ||
  mongoose.model("Livelihood", livelihoodSchema);
