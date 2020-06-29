import {NextFunction, Request, Response} from "express";
import {httpStatusCode} from "src/constants";
import {Middleware} from "@overnightjs/core/lib/decorators/types";

export type Unwrap = <T>(promise: Promise<T>, statusCode?: number) => Promise<void>;

export type ResumeResponse = Response & { unwrap: Unwrap };
export type Endpoint = (req: Request, res: ResumeResponse) => Promise<void>;

export const injectHelpers: Middleware = (req: Request, res: Response, next: NextFunction): void => {
    const unwrap = <T>(promise: Promise<T>, statusCode?: number): Promise<void> =>
        promise
            .then(x => {
                if (!x) {
                    res.sendStatus(statusCode || httpStatusCode.created);
                    return;
                }

                res.status(statusCode || httpStatusCode.success).send(x);
            })
            .catch(err => {
                res.status(httpStatusCode.internalServerError).send(err.message);
                throw err;
            });

    (res as ResumeResponse).unwrap = unwrap;
    next();
};
