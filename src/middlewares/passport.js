import passport from 'passport';
import db from '../db/models';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy} from 'passport-jwt';
import {createToken} from '../utils/helpers.js';

const initiatePassport = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false,
      },
      async function (req, username, password, done) {
        try {
          const user = await db.User.findOne({where: {userName: username}});
          if (!user) {
            return done('Incorrect username.', false, {
              message: 'Incorrect username.',
            });
          }
          const passVal = password === user.password;
          if (!passVal) {
            return done('Incorrect password.', false, {
              message: 'Incorrect password.',
            });
          }
          const token = createToken(user);
          user.token = token;
          return done(null, user);
        } catch (err) {
          console.log(err);
          return done(null, err);
        }
      },
    ),
  );

  passport.use('jwt',
    new JwtStrategy(
      {
        jwtFromRequest: getAccessToken,
        secretOrKey: process.env.JWT_SECRET_KEY,
      },
      async function (jwtPayload, cb) {
        console.log(jwtPayload);
        try {
          const user = await db.User.findOne({
            where: {userId: jwtPayload.userId},
          });
          console.log(user);
          if (user) {
            return cb(null, user);
          }else{
            return cb(null,'user not found')
          }
        } catch (err) {
          console.log(err);
          return cb(null,'token expired')
        }
      }
    ),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
};

const getAccessToken = function (req) {
  if (
    req &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return 'null';
};

export default initiatePassport;
