const fs = require("fs");
var multer = require("multer");
const mime = require('mime-types');
const STORAGE_ROOT = "public";
const sharp = require('sharp');
const path = require('path');

//Work Photos
const work_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let { id } = req.params;
    let existence = fs.existsSync(`${STORAGE_ROOT}/images/users/${id}/works`);

    if (!existence) {
      fs.mkdir(`${STORAGE_ROOT}/images/users/${id}/works`, function dirCreation(err) {
      });
    }
    cb(null, `${STORAGE_ROOT}/images/users/${id}/works`);
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname.replace(/\s/g, '');
    cb(null, Date.now() + "-" + fileName);
  }
});
//Profile Photo
const user_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let { id } = req.params;
    let existence = fs.existsSync(`${STORAGE_ROOT}/images/users/${id}/`);


    if (!fs.existsSync(`${STORAGE_ROOT}/images/users/`)) {
      fs.mkdir(`${STORAGE_ROOT}/images/users/`, function dirCreation(err) {
      });
    }

    if (!existence) {
      fs.mkdir(`${STORAGE_ROOT}/images/users/${id}/`, function dirCreation(err) {
      });
    } else {
      // Delete old profile images
      fs.readdir(`${STORAGE_ROOT}/images/users/${id}/`, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          console.log('file', file);
          if (!file.includes('.')) continue;
          fs.unlink(path.join(`${STORAGE_ROOT}/images/users/${id}/`, file), err => {
            if (err) throw err;
          });
        }
      });
    }
    cb(null, `${STORAGE_ROOT}/images/users/${id}/`);
  },
  filename: function (req, file, cb) {
    let ext = mime.extension(file.mimetype);
    cb(null, Date.now() + "-" + `profile.${ext}`);
  },
});

/** storage settings */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let { id } = req.params;
    let existence = fs.existsSync(`${STORAGE_ROOT}/images/${id}/`);

    if (!existence) {
      fs.mkdir(`${STORAGE_ROOT}/images/${id}/`, function dirCreation(err) {
      });
    }
    cb(null, `${STORAGE_ROOT}/images/${id}/`);
  },
  filename: function (req, file, cb) {
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

const resizeImages = async (req, res, next) => {
  let resize = 500, quality = 70;
  if (req.route.path && req.route.path.includes('upload_photo')) {
    resize = 300;
    quality = 50;
  }
  for (let i = 0; i < req.files.length; i++) {
    await sharp(req.files[i].path)
      .resize(resize)
      .png({ quality })
      .jpeg({ quality })
      .toBuffer((err, data) => {
        fs.writeFile(req.files[i].path, data, function () { });
      });
  }
  next();
};

/** fiel upload middleware returned */
exports.storageMiddleware = function (type) {
  var upload;
  switch (type) {
    case "ADVERTISEMENT_PHOTO":
      upload = multer({ storage, dest: STORAGE_ROOT, fileFilter });
      return upload.array("photos[]", 4);
    case "PROFILE_PHOTO":
      upload = multer({
        storage: user_storage,
        dest: STORAGE_ROOT,
        fileFilter
      });
      return upload.array("photos[]", 4);
    case "WORK_PHOTOS":
      upload = multer({
        storage: work_storage,
        dest: STORAGE_ROOT,
        fileFilter
      });
      return upload.array("photos[]", 4);
    default:
      return () => { };
  }
};

exports.resizeImages = resizeImages;
