const Shop = require("../../db/models/Shop");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopListFetch = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    return res.json(shops);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.shopCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    const newshop = await Shop.create(req.body);
    return res.status(201).json(newshop);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
