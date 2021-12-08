const User = require("../../database/models/Users");
const internals = {};

internals.get_user = async (req, res) => {
  return await User.find({ username: req.params.username })
    .then((doc) => {
      return { success: true, user: doc };
    })
    .catch(() => {
      return { success: false };
    });
};

internals.add_user = async (req, res) => {
  const { email, roles, username } = req.payload;
  const firstname = req.payload.fname;
  const lastname = req.payload.lname;
  const password = req.payload.pass1;
  const newUser = User({
    firstname,
    lastname,
    email,
    roles,
    username,
    password,
  });
  return await newUser
    .save()
    .then(() => {
      return {
        success: true,
        message: "User added successfully",
        user: newUser,
      };
    })
    .catch((err) => {
      return { success: false, message: "Error: " + err };
    });
};

module.exports = internals;
