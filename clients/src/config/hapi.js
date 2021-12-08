const Hapi = require("@hapi/hapi");
const Routes = require("./routes");

require("dotenv").config();
let internals = {};

exports.deploy = async () => {
  internals.server = new Hapi.Server({
    host: "localhost",
    port: process.env.SERVER_PORT,
  });

  Routes.init(internals.server);

  return internals.server;
};
