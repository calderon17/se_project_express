const express = require("express");
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((e) => console.error(e));

app.use(express.json());

app.use(routes);

app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {
  console.log(`listening on port 3001`);
});
