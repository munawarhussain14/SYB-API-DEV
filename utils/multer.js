const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../utils/errorHandler");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, next) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".png") {
      next(new ErrorHandler("File type not supported", 415));
      return;
    }
    next(null, 200);
  },
});
