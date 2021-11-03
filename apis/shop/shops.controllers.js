const shop = require("../../shop");
const shop = require("../../models/shop");
const shop = require("../../db/models/shop");

exports.getshops = async (req, res) => {
  try {
    const shops = await shop.find.populate("products");
    return res.json(shops);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.shopCreate = async (req, res) => {
  try {
    const newshop = await shop.create(req.body);
    return res.status(201).json(newshop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.productCreate = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

await shop.findOneAndUpdate(
  { _id: req.params.shopId },
  { $push: { products: newProduct._id } }
);
