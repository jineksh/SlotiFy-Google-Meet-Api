import { Response } from "express";


export interface successResponse<T> {
    success : boolean;
    data : T;
    message : string;
}


export function createSuccessResponse<T>(res : Response,data : T,message : string,statusCode : number = 200) : Response {

    const body : successResponse<T> = {

        success : true,
        data,
        message


    }

    return res.status(statusCode).json(body);
}