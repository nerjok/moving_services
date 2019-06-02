const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Advertisement = mongoose.model('advertisements');


const pagOptions = {
  page: 1,
  limit: 1,
  customLabels: {
    docs: 'users'
  }
};


module.exports = (app) => {
  app.get('/api/users/:user_id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
      res.send({error: 'Not valid userID'});
      return;
    }

    const user = await User.findById(req.params.user_id)
    res.send(user)
  });

  app.get('/api/users', requireLogin , async (req, res, next) => {
    const page = req.query.page || 1
    const users = await User.paginate({}, {...pagOptions, page})

    res.send(users)
  });

  app.post('/api/update_user', requireLogin, function (req ,res, next) {
    const { user } = req
    const {name, newPassword, repeatPassword, currentPassword} = req.body

    if (newPassword && newPassword == repeatPassword) {
      if (!user.checkPassword(currentPassword)) {
        res.send({ error: 'Incorrect password.' });
        return;
      } else {
        const passwdHash = user.generateHash(newPassword);
        user.password = passwdHash;
      }  
    }

    user.name = name
    user.save(function(err) {
      //res.send(err);
      console.log(err)
      return
    });

//= Temp for adds
    const add = new Advertisement({
      title: 'Casino Royale',
      description: 'My sugested work description',
      _user: user._id,
      author: user._id    // assign the _id from the person
    });
  
    add.save(function (err) {
      if (err) return handleError(err);
      // thats it!
    });
//= ended
    res.send(user)
  })

  app.get('/api/advertisements', requireLogin , async (req, res, next) => {
    const page = req.query.page || 1
    //const users = await User.paginate({}, {...pagOptions, page})
    const user = req.user
    const advertisements = await User.findById(req.user._id)
 /*   
    .populate('_advertisements').
    exec(function (err, user) {
      if (err) return handleError(err);
      console.log('The author is %s', user);
      // prints "The author is Ian Fleming"
    });
/** */
    console.log('[[advertisements]]', advertisements)
    res.send(advertisements)
  });
}