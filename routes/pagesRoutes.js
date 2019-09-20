module.exports = nextApp => {
  const express = require('express');
  const router = express.Router();
  const requireLogin = require('../middlewares/requireLogin');


  const mongoose = require("mongoose");
  const User = mongoose.model("User");
  const Advertisement = mongoose.model("Advertisement");




  router.get('/', async (req, res) => {console.log('indexRoute')
    const actualPage = '/index'
    const query = { id: 'pagesRoutes', test: 'testPropertyNN' } 
    
    const advertisements = await Advertisement.find({}).sort({'updatedAt': -1}).limit(5);
    const users = await User.find({}).limit(5);
    
    query.advertisements = advertisements;
    query.users = users;
    nextApp.render(req, res,  '/index', query);
      //res.send({server: 'started'})
  })

  router.get('/users', async (req, res) => {console.log('usersRoute')
    const actualPage = '/index'
    const query = { id: 'pagesRoutes', test: 'testPropertyNN' } 

    const advertisements = await Advertisement.find({}).sort({'updatedAt': -1}).limit(5);
    const users = await User.find({}).limit(5);
    
    query.advertisements = advertisements;
    query.users = users;
    return nextApp.render(req, res,  '/users', query);
  
      //res.send({server: 'started'})
  })


  router.get("/test", (req, res) => {
    const actualPage = '/index'
    const query = { id: 'req.params.hhhjjkkllvvoooo', test: 'testPropertyNN' } 
    nextApp.render(req, res,  '/index', query);
  })


  return router;
}
