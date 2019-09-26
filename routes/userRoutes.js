const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

const auth = require('../controllers/authorizationController');
const user = require('../controllers/usersController');
const passport = require('passport');

const multer = require('../middlewares/storageMiddleware');


router.get('/api/current_user', requireLogin, auth.currentUser);

router.get('/api/logout', requireLogin, auth.logout);

router.post('/auth/signup', auth.localSignup);

router.post('/auth/login', auth.localLogin);

router.post('/auth/forgot', auth.forgotPswd);

router.post('/auth/reset_password', auth.reset_password);

router.get('/auth/google', auth.googleAuth);

router.get('/auth/google/callback', passport.authenticate('google'), auth.googleAuthCallback);

router.post('/api/update_user', requireLogin, user.updateUser);

router.post('/api/user/update_password', requireLogin, user.changePassword);

router.get('/api/users', user.showUsers);

router.get('/api/users/:user_id', user.showUser);

router.post('/api/user/:id/upload_photo', requireLogin, multer.storageMiddleware("PROFILE_PHOTO"), user.uploadPhoto);

router.post('/api/user/:id/work_photos', requireLogin, multer.storageMiddleware("WORK_PHOTOS"), user.workPhotos);

router.post('/api/user/:id/delete_photo', requireLogin, user.deletePhoto);


//'/api/user/'+id+'/delete_photo/'+photo
module.exports = router;
