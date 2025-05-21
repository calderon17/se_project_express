const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

console.log(auth);
console.log(getCurrentUser);
router.get("/me", auth, getCurrentUser);
router.patch(
  "/me",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }),
  updateCurrentUser
);

/**
router.patch("/me", auth, updateCurrentUser);
 *
*/

module.exports = router;
