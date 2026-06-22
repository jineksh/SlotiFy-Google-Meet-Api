import { Request, Response, NextFunction } from "express";
import { notFound } from '../utils/errorHandler.js'


export function routeNotFound(_err : Error,_req : Request,_res : Response,next : NextFunction) : void{
    next(notFound('Route not found'));
    return;
}