"use strict";

const Hapi = require("./clients/src/config/hapi");

require("./clients/src/database/mongodb");

const init = async () => {
  const server = await Hapi.deploy();

  console.log(`Server started @ ${server.info.uri}`);
  await server.start();
};

init();
