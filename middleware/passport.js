const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../db/models/User");
const JWTStrategy = require("passport-jwt").Strategy;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
  } catch (error) {
    done(error);
  }
});

async (jwtPayload, done) => {
  if (Date.now() > jwtPayload.exp) {
    return done(null, false); // this will throw a 401
  }
  try {
    const user = await User.findOne(jwtPayload._id);
    done(null, user); // if there is no user, this will throw a 401
  } catch (error) {
    done(error);
  }
};
