const { dirname } = require("path");

exports.rootDir = dirname(process.mainModule.filename);
