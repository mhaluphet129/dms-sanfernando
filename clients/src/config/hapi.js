const Hapi = require("@hapi/hapi");
//const Path = require("path");
const Vision = require("@hapi/vision");
//const Handlebars = require("hbs");
const Routes = require("./routes");
let internals = {};

exports.deploy = async () => {
  internals.server = new Hapi.Server({
    host: "localhost",
    port: 5000,
  });

  await internals.server.register(Vision);

  /* internals.server.views({
    engines: {
      html: Handlebars,
    },
    relativeTo: __dirname,
    path: "../views",
  }); */

  Routes.init(internals.server);

  return internals.server;
};
