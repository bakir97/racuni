const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const korisnik = await Korisnik.findById(jwt_payload.id);
      if (korisnik) {
        return done(null, korisnik);
      }
      return done(null, false);
    })
  );
};
