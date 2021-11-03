const express = require("express");
const Shop = require("../../db/models/Shop");
const upload = require("../../middleware/multer");

const { shopListFetch, shopCreate, fetchshop } = require("./shops.controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchshop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    next({ status: 404, message: "shop Not Found!" });
  }
});

router.post("/", upload.single("image"), shopCreate);
// router.post("/:shopId/shops", shopCreate);

// router.get("/", getshops);

router.get("/", shopListFetch);

module.exports = router;
