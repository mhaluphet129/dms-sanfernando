const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.dbURL);

const db = mongoose.connection;

db.once("open", () => console.log("Database connected"));
db.on("error", (err) => console.log("Error: ", err));
