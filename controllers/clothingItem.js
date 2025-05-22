const clothingItemSchema = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItemSchema
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      if (!item) {
        next(new BadRequestError("Failed to create item"));
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      }
      next(err);
    });
};

const getItems = (req, res, next) => {
  clothingItemSchema
    .find({})
    .then((items) => {
      if (!items) {
        next(new NotFoundError("No items found"));
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
        return next(
          new ForbiddenError("You are not authorized to delete this item")
        );
      }
      return clothingItemSchema.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      if (!deletedItem) {
        next(new NotFoundError("Item not found"));
      }
      res.send({ data: deletedItem });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
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
        next(new NotFoundError("Item not found"));
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
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
        next(new NotFoundError("Item not found"));
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
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
