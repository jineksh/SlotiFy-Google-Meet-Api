import { NextFunction , Request , Response} from 'express';

import {z} from 'zod'

import { badRequest } from '../utils/errorHandler.js';


export function validateDto(schema : z.ZodSchema, source: "body" | "query" = "body"){


    return function validateMiddleware(req : Request,_res : Response,next : NextFunction){

        const target = source === "query" ? req.query : req.body;
        const parsedData = schema.safeParse(target);

        if(parsedData && !parsedData.success){
            return next(badRequest("Validation failed",parsedData.error.flatten()));
        }

        if(parsedData){
            if (source === "query") {
                req.query = parsedData.data as typeof req.query;
            } else {
                req.body = parsedData.data;
            }
        }

        next();

    }

}