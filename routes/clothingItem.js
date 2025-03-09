const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// crud

//create

router.post("/", createItem);

//read

router.get("/", getItems);

//update

router.put("/:itemId", updateItem);

//delete

router.delete("/:itemId", deleteItem);

//like and item

router.put("/:itemId/likes", likeItem);

// Dislike  an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
