const products = require("../../products");
const Product = require("../../db/models/Product");

const Category = require("../../db/models/Shop");

exports.fetchProduct = async (productId, next) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productListFetch = async (req, res, next) => {
  try {
    const products = await Product.find().populate("shop");
    return res.json(products);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};

exports.productDetailFetch = async (req, res, next) =>
  res.status(200).json(req.product);

exports.productCreate = async (req, res, next) => {
  try {
    req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

exports.productUpdate = async (req, res, next) => {
  try {
    req.body.image = `http://${req.protocol}://${req.get("host")}/media/${
      req.file.path
    }`;
    const product = await Product.findByIdAndUpdate(
      req.product,
      req.body,
      { new: true, runValidators: true } // returns the updated product
    );
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Create
// Status: 201
// Content: newly created item

// Retrieve (List && Detail)
// Status: 200
// Content: Requested data

// Update
// Status: 200
// Content: updated item

// Delete
// Status: 204
// Content: No Content
