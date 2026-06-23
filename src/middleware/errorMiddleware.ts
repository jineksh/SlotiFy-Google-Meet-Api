import { Request, Response, NextFunction } from "express";
import { ApiError } from '../utils/errorHandler.js'

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {


    type errorResponse = string | number | boolean | unknown;



    if (err instanceof ApiError) {

        const errorBody: Record<string, errorResponse> = {
            success: false,
            message: err.message,
        }

        if (err.details) errorBody.details = err.details;

        res.status(err.statusCodes).json(errorBody);
        return;
    }

    console.error('[error]', err);


    const body : Record<string,errorResponse> = {
        success : false,
        message : 'Something Went Wrong'
    }

    res.status(500).json(body);

}
