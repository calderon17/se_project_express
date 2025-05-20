const clothingItemSchema = require("../models/clothingItem");
// const {
//   INTERNAL_SERVER_CODE,
//   BAD_REQUEST_CODE,
//   NOT_FOUND_CODE,
//   FORBIDDEN_CODE,
// } = require("../utils/errors");

const { BadRequestError } = require("../errors/BadRequestError");
const { NotFoundError } = require("../errors/NotFoundError");
const { ForbiddenError } = require("../errors/ForbiddenError");

const createItem = (req, res, next) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItemSchema
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      if (!item) {
        throw new BadRequestError("Failed to create item");
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data provided");
      }
      next(err);
    });
};

const getItems = (req, res, next) => {
  clothingItemSchema
    .find({})
    .then((items) => {
      if (!items) {
        throw new NotFoundError("No items found");
      }
      res.send({ data: items });
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItemSchema
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }
      return clothingItemSchema.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      if (!deletedItem) {
        throw new NotFoundError("Item not found");
      }
      res.send({ data: deletedItem });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      next(err);
    });
};

const likeItem = (req, res, next) => {
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      next(err);
    });
};

const dislikeItem = (req, res, next) => {
  clothingItemSchema
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Item not found");
      }
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid item ID");
      }
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
