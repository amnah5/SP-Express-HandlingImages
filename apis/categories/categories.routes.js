const express = require("express");
const category = require("../../db/models/category");
const upload = require("../../middleware/multer");

const { categoryListFetch, categoryCreate } = require("./controllers");

// Create a mini express application
const router = express.Router();

// Param Middleware
router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await fetchcategory(categoryId, next);
  if (category) {
    req.category = category;
    next();
  } else {
    next({ status: 404, message: "category Not Found!" });
  }
});

router.post("/", upload.single("image"), categoryCreate);
router.post("/:categoryId/categorys", categoryCreate);
router.get("/", categoryListFetch);

router.get("/:categoryId", categoryDetailFetch);

router.put("/:categoryId", upload.single("image"), categoryUpdate);

router.delete("/:categoryId", categoryDelete);

router.get("/", getCategories);

router.post("/", categoryCreate);

router.post("/:categoryId/products", productCreate);

module.exports = router;
