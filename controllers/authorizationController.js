const passport = require('passport');
const PasswordMail = require('../services/PasswordMail');
const mongoose = require("mongoose");
const User = mongoose.model("User");

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
      return res.send(user);
    });
  })(req, res, next);
}

const localLogin = async (req, res, next) => {
  const {username, password } = req.body
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

const forgotPswd = async ( req, res) => {
  const { email } = req.body;
  const usr = await User.findOne({email});

  if (usr) {
    const password_reset = await usr.passwordReset();
    if (!password_reset.err) {
      const pswMail = new PasswordMail({subject: 'afdfa', password_reset }, '');
      pswMail.send();
      res.send({'msg': "Email sucessfuly registered"});
      return;
    }
  }
  res.send({err: "Password error"});
}


const reset_password = async (req, res) => {

  const { password, email, password_reset} = req.body;
  const usr = await User.findOne({email, password_reset})
  if (usr && usr._id) {
    const resp = await usr.passwordSet(password);
    if (resp.ok) {
     res.send({'msg': "Password changed sucessfuly"});
     return;
    } 
  }
  res.send({error: "Error, provided data doesn't match"});
}

module.exports = {
  currentUser,
  logout,
  localSignup,
  localLogin,
  googleAuth,
  googleAuthCallback,
  forgotPswd,
  reset_password
};
