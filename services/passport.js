const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Google Strategy
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        confirmed_email: true
      }).save();
      done(null, user);
    }
  )
);

/**
 * Local login/signup
 */
passport.use(
  new LocalStrategy(async function(username, password, done) {
    const existingUser = await User.findOne({ email: username });

    if (existingUser) {
      let validUsr = existingUser.validPassword(password);
      if (existingUser && validUsr) {
        if (!existingUser.confirmed_email) {
          return done(null, false, {
            message: 'Registration is not confirmed yet. Please check email.'
          });
        }

        return done(null, existingUser);
      }
    }
    return done(null, false, { message: 'Wrong credentials.' });
  })
);

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ email: email }, function(err, user) {
          if (err) return done(null, false, { message: err });

          if (user) {
            return done(null, false, { message: 'Email is already taken.' });
          } else {
            var newUser = new User();

            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);
