//Main entry point to node application
var express = require("express");
var app = express();

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("I'm Listening on port 3000...");
});
