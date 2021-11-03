const express = require("express");
const shop = require("../../db/models/shop");
const upload = require("../../middleware/multer");

const { shopListFetch, shopCreate } = require("./controllers");

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

// router.post("/", upload.single("image"), shopCreate);
// router.post("/:shopId/shops", shopCreate);

router.get("/", getshops);

router.post("/", shopCreate);

module.exports = router;
