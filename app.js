const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate"); //theory
const { requestLogger, errorLogger } = require("./middlewares/logger"); //theory // before import controller/users

const { createUser, login } = require("./controllers/users");
const routes = require("./routes");

const app = express(); // this goes frist over all
const { PORT = 3001 } = process.env;

// const errorHandler = require("./middlewares/error-handler"); //theory

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((e) => console.error(e));

app.use(cors());
app.use(express.json()); // needs to be 1st or before routes

app.use(requestLogger); //theory

app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes); // needs to be after routes for proper order

app.use(errorLogger); //theory
app.use(errors()); // celebrate error handler //theory
// app.use(errorHandler);  //theory

// Custom error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port 3001`);
});

// ... all other app.use() statements
// app.use(errorHandler);
