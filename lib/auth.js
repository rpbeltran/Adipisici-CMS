const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secrets = require('.../docs/secrets.json')
const userManagerCreds = secrets.user_manager

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: userManagerCreds.web.googleClientId,
            clientSecret: userManagerCreds.web.googleClientSecret,
            callbackURL: "PUT_CALLBACK_HERE"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};