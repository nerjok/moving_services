const mongoose = require("mongoose");
const User = mongoose.model("User");
const Advertisement = mongoose.model("Advertisement");
const { body, check, validationResult } = require("express-validator");


const pagOptions = {
  page: 1,
  limit: 3,
  customLabels: {
    docs: 'advertisements'
  }
};


const validate = method => {
  switch (method) {
    case "createAdvertisement": {
      return [
        body("title", "Invalid title").isLength({ min: 5, max: 100 }),
        body("description", "Invalid description")
          .exists()
          .isLength({ min: 50, max: 1000 }),
        body("skills")
          .exists()
          .isLength({ min: 5, max: 500 }),
        body("tools")
          .optional()
          .isLength({ min: 10, max: 500 }),
        body("time")
          .optional()
          .isLength({ min: 10, max: 500 }),
        body("payment")
          .optional()
          .isLength({ min: 10, max: 500 }),
        body("status")
          .optional()
          .isIn(["enabled", "disabled"])
      ];
    }
  }
};

const showAdvertisements = async (req, res, next) => {
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
}



const createAdvertisement = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const { title, description, skills, tools, payment, time } = req.body;

  let resp = await Advertisement.create({
    title,
    description,
    _user: req.user,
    skills,
    tools
  });

  if (!resp._id) {
    res.send({ errors: [{ msg: "Advertisement not saved" }] });
    return;
  }
  res.send(resp);
};

const updateAdvertisement = async (req, res, next) => {
  const { title, description, skills, tools, payment, time } = req.body;

  const resp = await Advertisement.findOneAndUpdate(
    { _id: req.params.id, _user: req.user._id },
    { title, description, skills, tools, payment, time },
    { new: true }
  );
  //console.log('[[updateAdvertisement]]', req.params.id, '[user]', req.user._id, '[[advertisement]]', resp)
  res.send(resp);
};

async function getAdvertisements(user, page = 0) {
  const limit = 5;
  const skip = page * limit;
  const usr = await User.findById(user._id)
    .populate({
      path: "advertisements",
      options: {
        skip,
        limit,
        sort: { _id: -1 }
      }
    })
    .populate("advertisementsCount");

  if (!usr || !usr.advertisements) return [];

  const ads = {
    page,
    advertisements: usr.advertisements,
    total: Math.ceil(usr.advertisementsCount / limit)
  };

  return ads;
}

const showAdvertisement = async (req, res, next) => {
  const advertisement = await Advertisement.findOne({
    _id: req.params.id
  }).populate("_user");

  res.send(advertisement);
};

const deleteAdvertisement = async (req, res, next) => {
  const { id } = req.params;
  const { page } = req.query;

  let resp = await Advertisement.deleteById(id);
  const advertisements = await getAdvertisements(req.user, page);
  res.send(advertisements);
};

module.exports = {
  validate,
  createAdvertisement,
  updateAdvertisement,
  showAdvertisement,
  showAdvertisements,
  deleteAdvertisement
};
