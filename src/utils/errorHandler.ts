export class ApiError extends Error {

    readonly statusCodes : number;
    readonly details?: unknown;

    constructor(message : string,statusCodes : number,details?: unknown){
        super(message);
        this.details = details;
        this.statusCodes = statusCodes;
        this.name = "ApiError";
        Error.captureStackTrace(this, this.constructor);
    }

}


export const badRequest = (message : string,details?:unknown) => new ApiError(message,400,details);
export const notFound = (message: string, details?: unknown) => new ApiError(message, 400,details);
export const serverError = (message = 'Internal Server Error',details? : unknown) => new ApiError(message,500,details);


