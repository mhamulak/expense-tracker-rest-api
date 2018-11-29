const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");

const authRoutes = require("./Auth/authRoutes");

const {
  app: { port },
  db: { connectionString }
} = config;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.validationError = errors => {
    res.status(422).json({
      success: false,
      error: {
        code: 422,
        message: "Validation error",
        errors
      }
    });
  };

  next();
});

app.use("/auth", authRoutes);

mongoose
  .connect(
    connectionString,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch(error => console.error(error));
