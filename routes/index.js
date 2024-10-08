const express = require("express");
const router = express.Router();
const {
  productController,
} = require("../controllers/productController");
const { getProductController } = require("../controllers/getProductController");
const {getSingleProductController} = require("../controllers/getSingleProductController")
const {upload} = require('../middleware/fileUpload')

router.post("/products", upload.single("image"), productController);
router.get("/", getProductController);
router.get("/products/:index", getSingleProductController);

module.exports = router;
