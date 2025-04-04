const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { NOT_FOUND_CODE } = require("../utils/errors");
const userRouter = require("./users");

router.use("/items", clothingItem);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: "Router not found" });
});

module.exports = router;
