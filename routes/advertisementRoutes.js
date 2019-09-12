const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

const multer = require('../middlewares/storageMiddleware');
const advertisements = require('../controllers/advertisementsControler');

const messages = require('../controllers/messageThreadController');

router.use(function authorized(req, res, next) {

  //console.log('[WantTo continue]');
  next();
})

router.post('/api/advertisements/new', requireLogin, advertisements.validate('createAdvertisement'), advertisements.createAdvertisement)

router.get('/api/advertisements', advertisements.showAdvertisements);

router.get('/api/advertisements/my', requireLogin ,advertisements.myAdvertisements);

router.get('/api/advertisements/filter', advertisements.filterAdvertisements);

router.get('/api/advertisements/:id', advertisements.showAdvertisement);

router.post('/api/advertisements/:id/update', requireLogin, advertisements.validate('createAdvertisement'), advertisements.updateAdvertisement);

router.post('/api/advertisements/:id/uploadphoto', requireLogin, multer.storageMiddleware("ADVERTISEMENT_PHOTO"), advertisements.uploadPhoto);

router.delete('/api/advertisements/:id/deletephoto/:photo', requireLogin, advertisements.deletePhoto);

router.delete('/api/advertisements/:id', requireLogin, advertisements.deleteAdvertisement);



router.get('/api/messages', requireLogin, messages.getMessages);

router.post('/api/messages', requireLogin, messages.addMessage);

router.get('/api/messages/:id', requireLogin, messages.showThreadMessages);

router.get('/api/messages_topics', requireLogin, messages.showMessageThreads);

router.post('/api/new_message', requireLogin, messages.createMessage);

router.post('/api/new_thread', requireLogin, messages.createThread);

module.exports = router;
