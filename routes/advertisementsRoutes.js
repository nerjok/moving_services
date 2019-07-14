const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Advertisement = mongoose.model('Advertisement');


const pagOptions = {
  page: 1,
  limit: 3,
  customLabels: {
    docs: 'advertisements'
  }
};

module.exports = app => {

  /**
  * Get advertisement
  */
  app.get('/api/advertisements', /*requireLogin ,*/ async (req, res, next) => {
    //const page = req.query.page ? +req.query.page +1 : 1
    var page = req.query.page || 0
   // page++;
    const user = req.user
    const limit = 5
    const skip = page * limit

    if (!req.user || !req.user._id) {
      /**
       * TODO
       * 
       * DEFINE alternate route to user self infos
       */
      const page2 = page++;
      const skip2 = page2 * limit;
      const advertisements = await Advertisement.paginate({},{
        ...pagOptions,
        page,
        skip,
        limit,
        sort: {'_id': -1}
      })
      res.send({...advertisements, total: Math.ceil(advertisements.totalDocs / limit)})
      return
    }



    const usr = await User.findById(req.user._id)
                          .populate({
                                      path: 'advertisements',
                                      options: {
                                        skip,
                                        limit,
                                        sort: {'_id': -1}
                                      },
                                    })
                            .populate('advertisementsCount')

                            if (!usr || !usr.advertisements) {
                              res.send({advertisements: []})
                              return
                            }
    const ads = {advertisements: usr.advertisements, //total: usr.advertisementsCount, page}
                                                    total: Math.ceil(usr.advertisementsCount / limit), page}

    console.log("[[paging]", req.query)
    res.send(ads)
  });

  app.get('/api/advertisements/:id', /*requireLogin,*/ async (req, res, next) => {
    const advertisement = await Advertisement.findOne({_id: req.params.id})
                                                            .populate('_user')
    res.send(advertisement)
  })

  app.post('/api/advertisements/:id/update', requireLogin, async (req, res, next) => {
    console.log('update', req.body)

    const {title, description } = req.body
    const resp = await Advertisement.findByIdAndUpdate(req.params.id, {title, description }, {new: true})
    console.log('[[updateAdvertisement]]', resp)
    res.send(resp)
  })

  app.post('/api/advertisements/new', requireLogin, async (req, res, next) => {
    console.log('new', req.body)
    const {title, description } = req.body
    resp = await Advertisement.create({title, description, _user: req.user})
    console.log('AdvertisementCreation', resp)
    res.send(resp)
  })

  app.delete('/api/advertisements/:id/', requireLogin, async (req, res, next) => {
    const { id } = req.params
    const { page } = req.query

      Advertisement.deleteById(id, function (err, petDocument) {
        // mongodb: { deleted: true, name: 'Fluffy', _id: '53da93b1...' }
        console.log('[[deleteedDoc]]', petDocument)
    });
    
    const advertisements = await getAdvertisements(req.user, page);
    res.send(advertisements)
  })

}

async function getAdvertisements (user, page = 0) {

  const limit = 5
  const skip = page * limit
  const usr = await User.findById(user._id)
                        .populate({
                                    path: 'advertisements',
                                    options: {
                                      skip,
                                      limit,
                                      sort: {'_id': -1}
                                    },
                                  })
                          .populate('advertisementsCount')

                          if (!usr || !usr.advertisements) 
                            return [];

  const ads = { 
                page,
                advertisements: usr.advertisements,
                total: Math.ceil(usr.advertisementsCount / limit)
              }

  return ads
}
