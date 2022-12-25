const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "content");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100000 * 100 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|png|jpeg|bmp/;
    const extname = fileTypes.test(path.extname(file.originalname));
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("please provide image");
    }
  },
}).single("file");

module.exports = upload;
