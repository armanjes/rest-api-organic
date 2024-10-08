// const Product = require("../models/products"); // Import the Product model

// const productController = async (req, res) => {
//     try {
//         console.log(req.body);
//     const { name, price, image } = req.body;
//     const imagePath = req.file ? req.file.path : null;
//     // Create a new product document
//     const newProduct = new Product({
//       name,
//       price,
//       image: imagePath, // Store the image path in the database
//     });

//     // Save the product to the database
//       const savedProduct = await newProduct.save();
      
      

//     res.status(201).json({
//       message: "Product created successfully",
//       product: savedProduct,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error saving product", error });
//   }
// };

// module.exports = { productController };


const cloudinary = require("cloudinary").v2; // Import Cloudinary
const { CLOUD_NAME, API_KEY, API_SECRET } = require("../config/cloudinary");
const Product = require("../models/products");
const fs = require("fs");

const productController = async (req, res) => {
  try {
    const { name, price } = req.body; // Extract 'name' and 'price', no 'image'

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products"
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    // Create a new product with the image URL
    const newProduct = new Product({
      name,
      price,
      image: imageUrl, // Store Cloudinary URL in the image field
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving product",
      error: error.message,
    });
  }
};

module.exports = { productController };
