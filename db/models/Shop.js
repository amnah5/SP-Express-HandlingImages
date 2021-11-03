const mongooseSlugPlugin = require("mongoose-slug-plugin");
const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { timestamps: true },
  {
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  }
);
shopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("shop", shopSchema);
