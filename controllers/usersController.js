const mongoose = require("mongoose");
const User = mongoose.model("User");
const Advertisement = mongoose.model("Advertisement");

const pagOptions = {
  page: 1,
  limit: 5,
  customLabels: {
    docs: "users"
  }
};

const showUsers = async (req, res, next) => {
  const page = req.query.page || 1;
  const users = await User.paginate({}, { ...pagOptions, page });

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
  const { name, description, available, city } = req.body;
  const updateData = {name, description, available, city}


  User.findByIdAndUpdate(user._id, 
    updateData, {
    new: true, 
    fields: {name: 1, email:1, description: 1, available: 1, city: 1}
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

module.exports = { showUsers, showUser, updateUser, changePassword };
