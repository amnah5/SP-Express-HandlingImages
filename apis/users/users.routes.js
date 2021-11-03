const express = require("express");
const { signup } = require("./users.controllers");

const router = express.Router();

router.post("/signup", signup);

// router.post(
//   "signin",
//   passport.authenticate("local", { session: false }),
//   signin
// );
