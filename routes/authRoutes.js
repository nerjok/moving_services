const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google', 
            passport.authenticate('google', {
                scope: ['profile', 'email']
            })
  );

  app.get('/auth/google/callback', 
            passport.authenticate('google'),
            (req, res) => {
                res.redirect('/surveys')
            }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  });

  app.post('/auth/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) 
       return res.send({error: info.message})
      if (!user) 
       return res.send({error: info.message})
      req.logIn(user, function(err) {
        if (err) 
          return res.send({error: info.message})
          console.log(user)
        return res.send(user);
      });
    })(req, res, next);
  });

  app.post('/auth/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) 
      return res.send({error: info.message})
      if (!user) 
      return res.send({error: info.message})
      req.logIn(user, function(err) {
        if (err) 
          return res.send({error: info.message})
          console.log(user)
        return res.send(user);
      });
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/')
  });
};
