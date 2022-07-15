import * as express from "express";
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(
    error: HttpError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ): void {
    res.status(error.httpCode || 500);
    res.json({
      name: error.name,
      message: error.message,
      errors: (error as any).errors || [],
    });
  }
}
