const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

const auth = require('../controllers/authorizationController');
const user = require('../controllers/usersController');
const passport = require('passport');



router.get('/api/current_user', requireLogin, auth.currentUser);

router.get('/api/logout', requireLogin, auth.logout);

router.post('/auth/signup', auth.localSignup);

router.post('/auth/login', auth.localLogin);

router.get('/auth/google', auth.googleAuth);

router.get('/auth/google/callback', passport.authenticate('google'), auth.googleAuthCallback);

router.post('/api/update_user', requireLogin, user.updateUser);

router.get('/api/users', requireLogin, user.showUsers);

router.get('/api/users/:user_id', requireLogin, user.showUser);


module.exports = router;
