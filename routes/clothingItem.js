const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// crud

// create

router.post(
  "/",
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      weather: Joi.string().required().valid("hot", "warm", "cold"),
      imageUrl: Joi.string().required().uri(),
    }),
  }),
  createItem
);

/* router.post("/", auth, createItem); */

// read

router.get("/", getItems);

// delete

router.delete(
  "/:itemId",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteItem
);

/** router.delete("/:itemId", auth, deleteItem);  */

// like and item

router.put(
  "/:itemId/likes",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  likeItem
);

/** router.put("/:itemId/likes", auth, likeItem);*
 */

// Dislike  an item

router.delete(
  "/:itemId/likes",
  auth,
  celebrate({
    params: Joi.object().keys({
      itemId: Joi.string().hex().length(24).required(),
    }),
  }),
  dislikeItem
);

/* router.delete("/:itemId/likes", auth, dislikeItem); */

module.exports = router;
