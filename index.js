const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./Auth/authRoutes");
const usersRoutes = require("./Users/usersRoutes");

const errorHandler = require("./utils/errorHandler");

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true });

    app.listen(process.env.PORT);
  } catch (error) {
    console.log(error);
  }
};

startServer();
