const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true },
  {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  }
);
CategorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", CategorySchema);
