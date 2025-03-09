const router = require("express").Router();
const clothingItem = require("./clothingItem");
const { INTERNAL_SERVER_CODE } = require("../utils/errors");

const userRouter = require("./users");
// const itemRouter = require("./items");

router.use("/items", clothingItem);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(INTERNAL_SERVER_CODE).send({ message: "Router not found" });
});

module.exports = router;
