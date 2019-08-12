const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');

const multer = require('../middlewares/storageMiddleware');
const advertisements = require('../controllers/advertisementsControler');


router.use(function authorized(req, res, next) {

  console.log('[WantTo continue]');
  next();
})

router.post('/api/advertisements/new', requireLogin, advertisements.validate('createAdvertisement'), advertisements.createAdvertisement)

router.get('/api/advertisements', advertisements.showAdvertisements);

router.get('/api/advertisements/filter', advertisements.filterAdvertisements);

router.get('/api/advertisements/:id', advertisements.showAdvertisement);

router.post('/api/advertisements/:id/update', requireLogin, advertisements.updateAdvertisement);

router.post('/api/advertisements/:id/uploadphoto', requireLogin, multer.storageMiddleware("ADVERTISEMENT_PHOTO"), advertisements.uploadPhoto);

router.delete('/api/advertisements/:id/deletephoto/:photo', requireLogin, advertisements.deletePhoto);

router.delete('/api/advertisements/:id', requireLogin, advertisements.deleteAdvertisement);


module.exports = router;
