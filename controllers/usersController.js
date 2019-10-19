const mongoose = require("mongoose");
const User = mongoose.model("User");
const deletePicture = require("../helpers/advertisements");

const pagOptions = {
  page: 1,
  limit: 5,
  customLabels: {
    docs: "users"
  }
};

const showUsers = async (req, res) => {
  const page = req.query.page || 1;
  const { keyword } = req.query;
  const searchObj = { $and: [{ status: { $gt: 1 } }] };
  if (keyword) {
    let keyw = {
      $or: [
        { description: { $regex: ".*" + keyword + ".*" } },
        { name: { $regex: ".*" + keyword + ".*" } },
        { email: { $regex: ".*" + keyword + ".*" } },
        { experience: { $regex: ".*" + keyword + ".*" } },
        { scope: { $regex: ".*" + keyword + ".*" } },
        { sphere: { $regex: ".*" + keyword + ".*" } }
      ]
    };

    searchObj.$and.push(keyw);
  }
  if (req.query.status) {
    let stats = { status: req.query.status };
    searchObj.$and.push(stats);
  }
  if (req.query.city) {
    let cit = { city: req.query.city };
    searchObj.$and.push(cit);
  }
  if (req.query.availableTime) {
    let avTm = { availableTime: { $all: req.query.availableTime } };
    searchObj.$and.push(avTm);
  }

  const users = await User.paginate(searchObj, { ...pagOptions, page });
  res.send(users);
};

const showUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.user_id))
    return res.send({ error: "Not valid userID" });

  const user = await User.findById(req.params.user_id);
  res.send(user);
};

const updateUser = async (req, res) => {
  const { user } = req;
  const { name, description, available, city, status, phone } = req.body;
  let updateData = { name, description, available, city, status, phone };
  if (!name && !description) {
    updateData = { ...req.body };
  }

  User.findByIdAndUpdate(user._id, updateData, {
    new: true,
    fields: {
      name: 1,
      email: 1,
      description: 1,
      available: 1,
      city: 1,
      status: 1,
      experience: 1,
      scope: 1,
      prices: 1,
      availableTime: 1,
      sphere: 1,
      phone: 1
    }
  })
    .then(result => {
      if (result) res.send(result);
      else res.send({ errors: "error" });
    })
    .catch(err => {
      res.send(err);
    });
};

const changePassword = (req, res) => {
  const { user } = req;
  const { newPassword, repeatPassword, currentPassword } = req.body;
  if (newPassword && newPassword == repeatPassword) {
    if (!user.checkPassword(currentPassword)) {
      return res.send({ error: "Incorrect password." });
    } else {
      const passwdHash = user.generateHash(newPassword);
      user.password = passwdHash;
      user
        .save()
        .then(result => {
          if (result) res.send(result);
          else res.send({ errors: "error" });
        })
        .catch(err => {
          res.send(err);
        });
    }
  } else res.send({ errors: "Wrong passwords" });
};

const uploadPhoto = async (req, res) => {
  if (req.files && !req.fileValidationError) {
    const profile_photo = req.files[0].path;

    User.findByIdAndUpdate(req.user._id, { profile_photo }, { new: true })
      .then(result => {
        if (result) res.send(result);
        else res.send({ errors: "error" });
      })
      .catch(err => {
        res.send(err);
      });
    return;
  }
  res.send({ msg: "controller message", error: "Controllwe upload error" });
};

const workPhotos = async (req, res) => {
  if (req.files && !req.fileValidationError) {
    let work_photos = [];
    req.files.forEach(file => {
      work_photos.push(file.path);
    });

    User.findByIdAndUpdate(req.user._id, { work_photos }, { new: true })
      .then(result => {
        if (result) return res.send(result);
        else return res.send({ errors: "error" });
      })
      .catch(err => {
        return res.send(err);
      });
  }
  res.send({ msg: "controller message", error: "Controllwe upload error" });
};

const deletePhoto = async (req, res) => {
  const picture = req.body.photo;
  let { work_photos } = req.user;
  work_photos = work_photos.filter(itm => itm != picture);

  User.findByIdAndUpdate(req.user._id, { work_photos }, { new: true })
    .then(result => {
      if (result) {
        deletePicture.deletePhoto(picture).catch(err => {
          console.log(err);
        });
        res.send(result);
      } else res.send({ errors: "error" });
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = {
  showUsers,
  showUser,
  updateUser,
  changePassword,
  uploadPhoto,
  workPhotos,
  deletePhoto
};
