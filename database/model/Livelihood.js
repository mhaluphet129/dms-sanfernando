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
});

let addressSchema = new mongoose.Schema({
  barangay: {
    type: String,
  },
  street: {
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
    personalfiles: {
      type: Array,
    },
    profileImage: {
      type: String,
    },
    profile: profileSchema,
    hasCoopOrAssoc: memberSchema,
    address: addressSchema,
    birth: birthSchema,
    civil: civilSchema,
    ethnicity: ethnicitySchema,
    government: governmentSchema,
    emergency: emergencySchema,
  },
  { timestamps: true }
);

export default mongoose.models.Livelihood ||
  mongoose.model("Livelihood", livelihoodSchema);
