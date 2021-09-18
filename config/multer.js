const { diskStorage } = require("multer");
const { join } = require("path");
const { randomBytes } = require("crypto");

const { rootDir } = require("../utils/root_dir");

exports.multer_storage = {
  storage: diskStorage({
    destination: join(rootDir, "uploads"),
    filename: function (req, file, cb) {
      const generateHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${generateHash}-${file.originalname}`;

      cb(null, fileName);
    },
  }),

  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};
