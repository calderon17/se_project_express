const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { errors } = require("celebrate"); // theory
const { celebrate, Joi } = require("celebrate");

const { requestLogger, errorLogger } = require("./utils/logger"); // theory // before import controller/users

const { createUser, login } = require("./controllers/users");
const routes = require("./routes");

const app = express(); // this goes frist over all
const { PORT = 3001 } = process.env;

const { errorHandler } = require("./middlewares/error-handler");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((e) => console.error(e));

app.use(cors());
app.use(express.json()); // needs to be 1st or before routes

app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

/*
app.post("/signin", login);
*/

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

/* app.post("/signup", createUser); */

app.use(routes); // needs to be after routes for proper order

app.use(errorLogger); // theory
app.use(errors()); // celebrate error handler //theory
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
