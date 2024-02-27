const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

class GoogleStrategy {
  constructor() {
    this.router = express.Router();
    this.passport = passport;
    this.GoogleStrategy = GoogleStrategy;
  }

  init() {
    this.passport.use(new this.GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => {
      console.log('passport callback function fired');
      console.log(profile);
    }));

    this.router.get('/google', this.passport.authenticate('google', {
      scope: ['profile'],
    }));

    this.router.get('/google/callback', this.passport.authenticate('google'), (req, res) => {
      res.send('You reached the callback URI');
    });

    return this.router;
  }
}

module.exports = GoogleStrategy;
