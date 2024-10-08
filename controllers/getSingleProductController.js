const Product = require("../models/products");

const getSingleProductController = async (req, res) => {
  try {
    // Fetch all products
    let products = await Product.find();

    // Get the index from the request params
    const index = parseInt(req.params.index, 10);

    // Check if the index is within the bounds of the array
    if (index < 0 || index >= products.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch the product by index
    const singleProduct = products[index];

    // Return the product as JSON
    return res.json(singleProduct);
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Error retrieving product", error: err.message });
  }
};

module.exports = { getSingleProductController };
