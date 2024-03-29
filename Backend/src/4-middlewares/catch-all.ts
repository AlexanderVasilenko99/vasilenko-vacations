import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";
import StatusCode from "../3-models/status-codes";

function catchAll(err: any, req: Request, res: Response, next: NextFunction): void {

    console.log(err);
    logger.logError(err.message, err)

    let status = err.status || 500;
    let message = appConfig.isProduction && status >= 500 ? "something went wrong, try again later" : err.message;
    if (err.errno === 1062) {
        message = "You Are trying to follow a vacation you are already following";
        status = StatusCode.BadRequest;
    }
    if (err.errno === 1452) {
        message = "userId or vacationId is incorrect";
        status = StatusCode.NotFound;
    }
    res.status(status).send(message);
}
export default catchAll