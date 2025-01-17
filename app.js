const express = require("express");
const productRoutes = require("./apis/products/routes");
// const connectDB = require("./db/database");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const shopsRoutes = require("./apis/shops/shops.routes");
const app = express();
const userRoutes = require("./apis/users/users.routes");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");
const jwtStrategy = require("jwtStrategy");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use((req, res, next) => {
  if (req.body.name === "Broccoli Soup")
    res.status(400).json({ message: "I HATE BROCCOLI!! KEEFY! " });
  else next();
});

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api/shops", shopsRoutes);
// Routes
app.use("/api/products", productRoutes);
app.use("/api", userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));
