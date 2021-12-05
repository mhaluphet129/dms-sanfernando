const Handler = require("./handler");
const internals = {};

internals.endpoints = [
  {
    method: ["GET"],
    path: "/",
    handler: Handler.home,
  },
  {
    method: ["POST"],
    path: "/add-user",
    handler: Handler.add_user,
  },
];

module.exports = internals;
