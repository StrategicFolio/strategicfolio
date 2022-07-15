import * as express from "express";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import config from "../../config";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  )
);

@Middleware({ type: "before" })
@Service()
export class PassportMiddleware implements ExpressMiddlewareInterface {
  public use(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    return passport.initialize()(req, res, next);
  }
}
