let mongoose = require("mongoose");

let nameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
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

let profileSchema = new mongoose.Schema({
  type: {
    type: Array,
  },
  crops: {
    type: Array,
  },
  livestock: {
    type: Array,
  },
  poultry: {
    type: Array,
  },
  farmWorker: {
    type: Array,
  },
  fisherFolks: {
    type: Array,
  },
  isARB: {
    type: Boolean,
  },
  qr: {
    type: String,
  },
});

let memberSchema = new mongoose.Schema({
  status: {
    type: Boolean,
  },
  name: {
    type: String,
  },
});

let livelihoodSchema = new mongoose.Schema(
  {
    name: nameSchema,
    gender: {
      type: String,
    },
    contactNum: {
      type: String,
    },
    religion: {
      type: String,
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
    isActive: {
      type: Boolean,
      default: true,
    },
    programs: {
      type: Array,
    },
    farmlandID: {
      type: Array,
    },
    timeline: {
      type: Array,
    },
    profile: profileSchema,
    hasCoopOrAssoc: memberSchema,
    address: addressSchema,
    birth: birthSchema,
    civil: civilSchema,
    household: houseHoldSchema,
    ethnicity: ethnicitySchema,
    government: governmentSchema,
    emergency: emergencySchema,
  },
  { timestamps: true }
);

export default mongoose.models.Livelihood ||
  mongoose.model("Livelihood", livelihoodSchema);
