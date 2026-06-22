import { NextFunction , Request , Response} from 'express';

import {z} from 'zod'

import { badRequest } from '../utils/errorHandler.js';


export function validateDto(schema : z.ZodSchema){


    return function validateMiddleware(req : Request,_res : Response,next : NextFunction){


        const parsedBody = schema.safeParse(req.body);

        if(parsedBody && !parsedBody.success){
            return next(badRequest("Validation failed",parsedBody.error.flatten()));
        }

        if(parsedBody){
            req.body = parsedBody.data;
        }

        next();

    }

}