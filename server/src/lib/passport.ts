import { jwtSecret } from './config';
import userModal from '../modules/user/user.model';
import { isPublicAPI } from '../utils/public-apis';
import express from 'express';
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

class PassportAuth {
  init(app: express.Application) {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload: any, done: any) => {
        const user = await this.getUserById(jwt_payload.userId); // Replace with actual DB call
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
    );
    this.authorizeRoutes(app);
  }

  authorizeRoutes(app: express.Application) {
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (!isPublicAPI(req)) {
          passport.authenticate('jwt', { session: false })(req, res, next);
        } else {
          next();
        }
      }
    );
  }

  async getUserById(userId: string) {
    try {
      return await userModal.fetchUser({ userId });
    } catch {
      return null;
    }
  }
}
export const passportAuth = new PassportAuth();
