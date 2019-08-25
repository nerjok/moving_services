const passport = require('passport');

const currentUser = async (req, res, next) => {
  res.send(req.user);
}

const logout = async (req, res, next) => {
  req.logout();
  res.redirect('/')
}


const localSignup = async (req, res, next) => {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) 
     return res.send({error: info.message})
    if (!user) 
     return res.send({error: info.message})
    req.logIn(user, function(err) {
      if (err) 
        return res.send({error: info.message})
        console.log(user)
      return res.send(user);
    });
  })(req, res, next);
}

const localLogin = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err || !user) 
     return res.send({error: info.message})

    req.logIn(user, function(err) {
      if (err) 
        return res.send({error: info.message})
      return res.send(user);
    });
  })(req, res, next);
}

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = (req, res, next) => { 
  const { user } = req
  if (!user.description && !user.name || !user.available || !user.city) {
    res.redirect('/user/editprofile');
    return;
  }
  res.redirect('/') 
}

module.exports = {
  currentUser,
  logout,
  localSignup,
  localLogin,
  googleAuth,
  googleAuthCallback
};