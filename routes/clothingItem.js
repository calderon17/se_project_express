const router = require("express").Router();
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

router.post("/", auth, createItem);

// read

router.get("/", getItems);

// delete

router.delete("/:itemId", auth, deleteItem);

// like and item

router.put("/:itemId/likes", auth, likeItem);

// Dislike  an item
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
