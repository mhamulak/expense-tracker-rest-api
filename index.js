const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");

const authRoutes = require("./Auth/authRoutes");
const usersRoutes = require("./Users/usersRoutes");

const errorHandler = require("./utils/errorHandler");

const {
  app: { port },
  db: { connectionString }
} = config;

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
