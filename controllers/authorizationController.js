const passport = require('passport');
const PasswordMail = require('../services/PasswordMail');
const ConfirmMail = require('../services/ConfirmMail');

const mongoose = require("mongoose");
const User = mongoose.model("User");

const currentUser = async (req, res) => res.send(req.user);

const logout = async (req, res) => {
  req.logout();
  res.redirect('/');
};

const confirmEmail = async (req, res) => {
  let doc = await User.findOneAndUpdate({_id: req.params.id}, {confirmed_email: true}, {
    new: true
  });
  if (doc)
    res.redirect('/login');
};

const localSignup = async (req, res, next) => {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) 
      return res.send({error: info.message});
    if (!user) 
      return res.send({error: info.message});

    if (user) {
      const confMail = new ConfirmMail({subject: 'afdfa', user_id: user._id }, '');
      confMail.send();
      res.send({'error': "Confirmation email sucessfuly send"});
      return;
    }

    req.logIn(user, function(err) {
      if (err) 
        return res.send({error: info.message});
      return res.send(user);
    });
  })(req, res, next);
};


const localLogin = async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {  
   
    if (err || !user) 
      return res.send({error: info.message});

    req.logIn(user, function(err) {
      if (err) 
        return res.send({error: info.message});
      return res.send(user);
    });
  })(req, res, next);
};

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleAuthCallback = (req, res) => { 
  const { user } = req;
  if (!user.description && !user.name || !user.available || !user.city) {
    return res.redirect('/user/editprofile');
  }
  res.redirect('/'); 
};

const forgotPswd = async ( req, res) => {
  const { email } = req.body;
  const usr = await User.findOne({email});

  const today = new Date();
  const updated = new Date(usr.updatedAt);
  const diff = ((today - updated) / 1000 ) / 60;

  if (diff < 30) {
    return res.send({error: 'Email already sent'});
  }

  if (usr) {
    const password_reset = await usr.passwordReset();
    if (!password_reset.err) {
      const pswMail = new PasswordMail({subject: 'afdfa', password_reset }, '');
      pswMail.send();
      return res.send({'msg': "Email sucessfuly registered"});
    }
  }
  res.send({err: "Password error"});
};


const reset_password = async (req, res) => {

  const { password, email, password_reset} = req.body;
  const usr = await User.findOne({email, password_reset});
  if (usr && usr._id) {
    const resp = await usr.passwordSet(password);
    if (resp.ok) {
      return res.send({'msg': "Password changed sucessfuly"});
    } 
  }
  res.send({error: "Error, provided data doesn't match"});
};

module.exports = {
  currentUser,
  logout,
  localSignup,
  localLogin,
  googleAuth,
  googleAuthCallback,
  forgotPswd,
  reset_password,
  confirmEmail
};
