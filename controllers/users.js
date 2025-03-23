const User = require("../models/user");
const {
  BAD_REQUEST_CODE,
  INTERNAL_SERVER_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
} = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { merge } = require("../routes");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_CODE)
        .send({ message: "An internal error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(name, avatar, email, password);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({ name, avatar, email: req.body.email, password: hash })
    )

    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "A bad request has occurred on the server" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT_CODE)
          .send({ message: "Email already exists" });
      }
      return res
        .status(INTERNAL_SERVER_CODE)
        .send({ message: "An internal error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "User profile not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(INTERNAL_SERVER_CODE)
        .send({ message: "An internal error has occurred on the server" });
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid data provided" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_CODE).send({ message: "User not found" });
      }
      return res
        .status(INTERNAL_SERVER_CODE)
        .send({ message: "An internal error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(NOT_FOUND_CODE)
        .send({ message: "Email or password is incorrect" });
    });
};

module.exports = {
  getUsers,
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
