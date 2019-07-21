const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');


const fs = require('fs');
var multer  = require('multer')

var storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      let { id } = req.params
      let existence = fs.existsSync(`uploads/${id}/`)

      if (!existence) {
        fs.mkdir(`uploads/${id}/`, function dirCreation(err) {
          console.log('[dircreation]', err)
        });
      }
      console.log('[[existence]]', existence);
      cb(null, `uploads/${id}/`)
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
});
var upload = multer({storage, dest: 'uploads',   fileFilter: function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      //return cb('Only image files are allowed!', false);
      req.fileValidationError = 'goes wrong on the mimetype';
      return cb(null, false, new Error('goes wrong on the mimetype'));
  }
  cb(null, true);
}})
//var upload = multer({ dest: 'uploads/' })



const advertisements = require('../controllers/advertisementsControler')


router.use(function authorized(req, res, next) {

  console.log('[WantTo continue]');
  next();
})

router.post('/api/advertisements/new', requireLogin, advertisements.validate('createAdvertisement'), advertisements.createAdvertisement)

router.get('/api/advertisements', advertisements.showAdvertisements);

router.get('/api/advertisements/:id', advertisements.showAdvertisement);

router.post('/api/advertisements/:id/update', requireLogin, advertisements.updateAdvertisement);

router.post('/api/advertisements/:id/uploadphoto', requireLogin, upload.array('photos[]', 4), advertisements.uploadPhoto);

router.delete('/api/advertisements/:id', requireLogin, advertisements.deleteAdvertisement);


module.exports = router;
