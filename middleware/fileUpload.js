const multer = require("multer");
const path = require("path");

const { CLOUD_NAME, API_KEY, API_SECRET } = require("../config/cloudinary");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be saved in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const fn = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, fn); // Generate the file name using timestamp and extension
  },
});
const upload = multer({ storage });

module.exports = { upload };
