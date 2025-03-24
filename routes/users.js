const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { auth } = require("../middlewares/auth");

// console.log("Imported controller:", usersController); // Add this line to debug
console.log(auth);
console.log(getCurrentUser);
router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
