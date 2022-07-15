import "reflect-metadata";
import "dotenv/config";

import { Application } from "express";
import { Action, createExpressServer } from "routing-controllers";
import path from "path";
import passport from "passport";
import iocLoader from "./loaders/iocLoader";
import { UserRepository } from "./api/repositories/UserRepository";

const run = async () => {
  iocLoader();

  const app: Application = createExpressServer({
    cors: true,
    classTransformer: true,
    defaultErrorHandler: false,
    /**
     * We can add options about how routing-controllers should configure itself.
     * Here we specify what controllers should be registered in our express server.
     */
    controllers: [
      path.join(__dirname, "../dist/api/controllers/**/*Controller.js"),
    ],
    middlewares: [
      path.join(__dirname, "../dist/api/middlewares/**/*Middleware.js"),
    ],
    interceptors: [
      path.join(__dirname, "../dist/api/interceptors/**/*Interceptor.js"),
    ],

    /**
     * Authorization features
     */
    authorizationChecker: async (action: Action) => {
      return new Promise<boolean>((resolve, reject) => {
        passport.authenticate("jwt", (err, payload) => {
          if (err) {
            reject(err);
          }
          if (!payload) {
            resolve(false);
          }
          UserRepository.findOneBy({ id: payload.id })
            .then((user) => {
              action.request.user = user;
              resolve(true);
            })
            .catch(() => {
              reject(new Error("User not found."));
            });
        })(action.request, action.response, action.next);
      });
    },
    currentUserChecker: (action: Action) => action.request.user,
  });

  app.listen(process.env.PORT);
};

run()
  .then(() => {
    console.info("API running on port:", process.env.PORT);
  })
  .catch((err) => console.debug(err));
