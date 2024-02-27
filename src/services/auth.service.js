require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
        clientId = process.env.GOOGLE_CLIENT_ID,
        clientSecret = process.env.GOOGLE_CLIENT_SECRET,
        );

class GoogleStrategyService {
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
        }, (issuer, profile, cb) => {
            console.log('passport callback function fired');
            console.log(profile);
        }));

        this.passport.serializeUser((user, done) => {
            done(null, user);
        }
        );

        this.passport.deserializeUser((user, done) => {
            done(null, user);
        }
        );
    }

    async google(req, res) {
        console.log('google');
        this.passport.authenticate('google', {
            scope: ['profile'],
        });
    }

    async callback(req, res) {
        console.log('callback');
        this.passport.authenticate('google'), (req, res) => {
            res.send('You reached the callback URI');
        };
    }

    async logout(req, res) {
        console.log('logout');
        return res.status(200).json({ message: 'Logout' });
    }

    async login(req, res) {
        console.log('login');
        this.passport.session()
        return res.status(200).json({ message: 'Login' });
    }
    // I want to check if the access token retrieved from the frontend is valid
    async check(req, res) {
        console.log('check');
        const token = req.body.token;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(payload);
        const userid = payload['sub'];
        return res.status(200).json({ message: 'Check' });
    }

    async verify(token) {
        console.log('verify');
        console.log(token.idToken);
        console.log('verify2');
        const payload = await client.getToken(token.idToken);
        console.log(payload);
        const userid = payload['sub'];
        return payload;
    }
}


module.exports = new GoogleStrategyService();
