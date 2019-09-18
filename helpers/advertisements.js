const testFolder = 'public/images';
const fs = require('fs');
const STORAGE_ROOT = "public";



exports.advertisementPhotos = (advertisementId) => {
  let uri = `${STORAGE_ROOT}/images/${advertisementId}/`;
  let existence = fs.existsSync(uri);
  let advArray = []
  if (existence) {
    fs.readdirSync(uri).forEach(file => {
      console.log(file);
      advArray.push(file)
    });
  }
  return advArray;
}


exports.deletePhotos = (advertisementId, photo) => {console.log('[deletePhotos]')
  return fs.unlink(`public/images/${advertisementId}/${photo}`, (err) => {
    if (err) throw err;
    console.log("errorDeletion", err);
    return err;
  });
}

exports.deletePhoto = async (path) => {console.log('[deletePhoto]')
  return fs.unlink(path, (err) => {
    if (err) throw err;
    console.log("errorDeletion", err);
    return err;
  });
}