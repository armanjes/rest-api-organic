const express = require("express");
const cors = require("cors");
const { APP_PORT, DB_URL } = require("./config");
const app = express();
const router = require("./routes/index");
const mongoose = require("mongoose");

// Database connection
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connection successful!"));

// middlewares
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api", router);

app.listen(APP_PORT, () => console.log(`listening ${APP_PORT}`));
