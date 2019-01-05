const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./Auth/authRoutes");
const usersRoutes = require("./Users/usersRoutes");
const categoriesRoutes = require("./Categories/categoriesRoutes");
const accountsRoutes = require("./Accounts/accountsRoutes");

const validateJWT = require("./Auth/middlewares/validateJWT");

const errorHandler = require("./utils/errorHandler");

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/users", validateJWT, usersRoutes);
app.use("/categories", validateJWT, categoriesRoutes);
app.use("/accounts", validateJWT, accountsRoutes);

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
