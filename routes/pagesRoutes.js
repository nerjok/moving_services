module.exports = nextApp => {
  const express = require('express');
  const router = express.Router();
  const requireLogin = require('../middlewares/requireLogin');


  router.get("/test", (req, res) => {
    const actualPage = '/index'
    const query = { id: 'req.params.hhhjjkkllvvoooo', test: 'testPropertyNN' } 
    nextApp.render(req, res,  '/index', query);
  })

  router.get('/', async (req, res) => {
    const actualPage = '/index'
    const query = { id: 'pagesRoutes', test: 'testPropertyNN' } 
    nextApp.render(req, res,  '/index', query);
  
      //res.send({server: 'started'})
  })

  router.get('/users', async (req, res) => {
    const actualPage = '/index'
    const query = { id: 'pagesRoutes', test: 'testPropertyNN' } 
    nextApp.render(req, res,  '/users', query);
  
      //res.send({server: 'started'})
  })

  return router;
}
