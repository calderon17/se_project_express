const router = require("express").Router();
const { getUsers, createUser } = require("../controllers/users-c");

router.get("/", getUsers);
router.get("/:userId", () => console.log("GET users by ID"));
router.post("/", () => createUser);

module.exports = router;
