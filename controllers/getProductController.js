const Product = require("../models/products");

const getProductController = async (req, res) => {
  try {
    let products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Error retrieving products", error: err.message });
  }
};

module.exports = { getProductController };
