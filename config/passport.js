const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const keys = require('../config/keys');

const User = db.User;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.passportKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            //attributes: ['id','name','email','role','avatar','statusId','clanId'],
            where: {id: jwt_payload.id}
        })
            .then(user => {
                if(user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(err => console.log(err));
    }));
};
