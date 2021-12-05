"use strict";

var adminAuth = require("../routes/admin/endpoints");

var internals = {};

//Concatentate the routes into one array
internals.routes = [].concat(adminAuth.endpoints);

//Set the routes for the server
internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
