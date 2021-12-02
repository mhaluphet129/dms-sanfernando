const express = require("express"); //Line 1
const cors = require("cors");
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on http://localhost:${port}`)); //Line 6

app.use(cors());

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "naka pass ug data gikan sa backend" }); //Line 10
}); //Line 11
