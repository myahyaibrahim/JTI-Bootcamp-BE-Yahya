const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 300;
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiv1 = require("./api/v1/routing");
app.use("/api/v1", apiv1);

// Get hostname
let hostname;
if (process.env.VCAP_APPLICATION) {
  const vcap = JSON.parse(process.env.VCAP_APPLICATION);
  hostname = "https://" + vcap.application_uris[0];
} else {
  hostname = `http://localhost:${port}`;
}

app.listen(port, function () {
  console.log(`listening at ${hostname}`);
});

module.exports = app;