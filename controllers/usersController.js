const mongoose = require("mongoose");
const User = mongoose.model("User");
const Advertisement = mongoose.model("Advertisement");
const  deletePicture = require('../helpers/advertisements');

const pagOptions = {
  page: 1,
  limit: 5,
  customLabels: {
    docs: "users"
  }
};

const showUsers = async (req, res, next) => {
  const page = req.query.page || 1;

  const searchOpt = {}
  if (req.query.status)
    searchOpt.status = req.query.status;
  if (req.query.city)
    searchOpt.city = req.query.city;
  if (req.query.availableTime)
    searchOpt.availableTime = { $all : req.query.availableTime};
  
    const users = await User.paginate(searchOpt, { ...pagOptions, page });
console.log(req.body, req.query, req.params)
  res.send(users);
};

const showUser = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
    res.send({ error: "Not valid userID" });
    return;
  }

  const user = await User.findById(req.params.user_id);
  res.send(user);
};

const updateUser = async (req, res, next) => {
  const { user } = req;
  const { name, description, available, city, status } = req.body;
  let updateData = { name, description, available, city, status }
  if (!name && !description) {
    updateData = {...req.body}
  }

  User.findByIdAndUpdate(user._id, 
    updateData, {
    new: true, 
    fields: {name: 1, email:1, description: 1, available: 1, city: 1, status: 1, experience: 1, 
      scope: 1, prices: 1, availableTime: 1, sphere: 1 }
    }
  )
  .then(result=> {
    if (result)
      res.send(result)
    else
      res.send({errors: 'error'})  
  })
  .catch(err => {
    res.send(err);
  });
};


const changePassword = (req, res, next) => {
  const { user } = req;
  const { newPassword, repeatPassword, currentPassword } = req.body;
  if (newPassword && newPassword == repeatPassword) {
    if (!user.checkPassword(currentPassword)) {
      res.send({ error: "Incorrect password." });
      return;
    } else {
      const passwdHash = user.generateHash(newPassword);
      user.password = passwdHash;
      user.save()
      .then(result=> {
        if (result)
          res.send(result)
        else
        res.send({errors: 'error'})  
      })
      .catch(err => {
        res.send(err);
        console.log('error', err);
      })
    }
  } else 
    res.send({errors: 'Wrong passwords'})
}

const uploadPhoto = async (req, res, next) => {
  if (req.files && !req.fileValidationError) {

    const profile_photo = req.files[0].path;

    User.findByIdAndUpdate(req.user._id, {profile_photo}, {new: true})
    .then(result=> {
      if (result)
        res.send(result)
      else
        res.send({errors: 'error'})  
    })
    .catch(err => {
      res.send(err);
    });
   return;
  }
  res.send({msg: 'controller message', error: 'Controllwe upload error'})
}


const workPhotos = async (req, res, next) => {
  if (req.files && !req.fileValidationError) {

//console.log('workPhotos', req.files)
    work_photos = [];
    req.files.forEach(file => {
      work_photos.push(file.path);
    });
    

    User.findByIdAndUpdate(req.user._id, {work_photos}, {new: true})
    .then(result=> {
      if (result)
        res.send(result)
      else
        res.send({errors: 'error'})  
    })
    .catch(err => {
      res.send(err);
    });
    
   //res.send({})
   return;
  }
  res.send({msg: 'controller message', error: 'Controllwe upload error'})
}

const deletePhoto = async (req, res, next) => {
  const picture = req.body.photo;
  
  let { work_photos } = req.user
  work_photos = work_photos.filter(itm => itm != picture)
  
  User.findByIdAndUpdate(req.user._id, {work_photos}, {new: true})
  .then(result=> {
    if (result) {console.log('deletionResult', result.work_photos)
      deletePicture.deletePhoto(picture).catch(err=>{console.log(err)});
      res.send(result);
    } else
      res.send({errors: 'error'})  
  })
  .catch(err => {
    res.send(err);
  });



  //res.send({kuku:'kuku'});
}

module.exports = { showUsers, showUser, updateUser, changePassword, uploadPhoto, workPhotos, deletePhoto };
