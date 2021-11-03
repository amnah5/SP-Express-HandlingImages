const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  username: { type: String, unique: true },
  password: String,
});

module.exports = model("User", UserSchema);
