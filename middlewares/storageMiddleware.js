const fs = require("fs");
var multer = require("multer");
const STORAGE_ROOT = "public";

/** storage settings */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let { id } = req.params;
    let existence = fs.existsSync(`${STORAGE_ROOT}/images/${id}/`);

    if (!existence) {
      fs.mkdir(`${STORAGE_ROOT}/images/${id}/`, function dirCreation(err) {
      });
    }
    cb(null, `${STORAGE_ROOT}/images/${id}/`);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

/** filter file extensions */
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = "wrong mimetype";
    return cb(null, false, new Error("goes wrong on the mimetype"));
  }
  cb(null, true);
};

/** fiel upload middleware returned */
exports.storageMiddleware = function(type) {
  var upload;
  switch (type) {
    case "ADVERTISEMENT_PHOTO":
      upload = multer({ storage, dest: STORAGE_ROOT, fileFilter });
      return upload.array("photos[]", 4);
    case "PROFILE_PHOTO":
      return () => {};
    default:
      return () => {};
  }
};