const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // before import controller/users

const { createUser, login } = require("./controllers/users");
const { auth } = require("./middlewares/auth");
const routes = require("./routes");

const app = express(); // this goes frist over all
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((e) => console.error(e));

app.use(cors());
app.use(express.json()); // needs to be 1st or before routes

app.post("/signin", login);
app.post("/signup", createUser);

app.use(routes); // needs to be after routes for proper order

app.listen(PORT, () => {
  console.log(`listening on port 3001`);
});

app.use(auth, routes);
