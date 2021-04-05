// Require packages
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Setup Express App
const app = express();
const PORT = process.env.PORT || 8080;
// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgan.format(name, format)
app.use(morgan("dev"));

// Use static directory for assets
app.use(express.static("public"));

// Invoke Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Setup Mongoose Atlas environment
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workitDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}!`);
});
