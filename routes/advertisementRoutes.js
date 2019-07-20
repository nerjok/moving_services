const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');


const advertisements = require('../controllers/advertisementsControler')



router.post('/api/advertisements/new', requireLogin, advertisements.validate('createAdvertisement'), advertisements.createAdvertisement)

router.get('/api/advertisements', advertisements.showAdvertisements);

router.get('/api/advertisements/:id', advertisements.showAdvertisement);

router.post('/api/advertisements/:id/update', requireLogin, advertisements.updateAdvertisement);

router.delete('/api/advertisements/:id', requireLogin, advertisements.deleteAdvertisement);


module.exports = router;
