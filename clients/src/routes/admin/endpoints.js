const Handler = require("./handler");
const internals = {};

internals.endpoints = [
  {
    method: ["POST"],
    path: "/add-user",
    handler: Handler.add_user,
  },
  {
    method: ["GET"],
    path: "/get-user/{username}",
    handler: Handler.get_user,
  },
];

module.exports = internals;
