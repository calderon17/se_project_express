const router = require("express").Router();
const { errors } = require("celebrate");
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { errorHandler } = require("../middlewares/error-handler");

const { NotFoundError } = require("../errors/NotFoundError");

router.use("/items", clothingItem);

router.use("/users", userRouter);

router.use(errors());

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

router.use(errorHandler);

module.exports = router;
