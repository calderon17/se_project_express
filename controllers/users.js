const jwt = require("jsonwebtoken"); // before import controller/users
const bcrypt = require("bcryptjs"); // before import controller/users

const User = require("../models/user");

const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");
const { UnauthorizedError } = require("../errors/UnauthorizedError");
const { ConflictError } = require("../errors/ConflictError");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  console.log(name, avatar, email, password);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({ name, avatar, email: req.body.email, password: hash })
    )

    .then((user) => {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return res.status(201).send(userWithoutPassword);
    })

    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User profile not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID format"));
      } else {
        next(err);
      }
    });
};

const updateCurrentUser = (req, res, next) => {
  const updates = {};
  const { name, avatar } = req.body;

  if (name) {
    updates.name = name;
  }
  if (avatar) {
    updates.avatar = avatar;
  }

  return User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password fields are required"));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Email or password is incorrect"));
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateCurrentUser,
};
