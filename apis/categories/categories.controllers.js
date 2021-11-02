const categorys = require("../../categorys");
const category = require("../../db/models/category");
const Category = require("../../models/Category");
const Category = require("../../db/models/Category");

exports.fetchcategory = async (categoryId, next) => {
  try {
    const category = await category.findById(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.categoryCreate = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.productCreate = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    req.body = { ...req.body, category: categoryId };
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
await Category.findOneAndUpdate(
  { _id: req.params.categoryId },
  { $push: { products: newProduct._id } }
);
exports.productListFetch = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("products");
    return res.json(categories);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
