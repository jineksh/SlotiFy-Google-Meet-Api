
import { createUserService , getUserByIdService , getUserByEmailService, deleteUserService,
updateUserService
} from "../service/user.service.js";
import {createSuccessResponse}  from "../utils/successResponse.js";
import { Request,Response,NextFunction } from "express";


export async function createUserController(req : Request , res : Response , next : NextFunction){


    const user = await createUserService(req.body);

    createSuccessResponse(res,user,'user created successfully',201);
    
}


export async function getUserByIdController(req : Request , res : Response , next : NextFunction){

    const userId = req.params.id;

    console.log('user id',userId);

    const user = await getUserByIdService(Number(userId));
    createSuccessResponse(res,user,'user fetched successfully');

}


export async function getUserByEmailController(req : Request , res : Response , next : NextFunction){

    const email : string = req.body.email;

    const user = await getUserByEmailService(email);

    createSuccessResponse(res,user,'user fetched successfully');

}

export async function deleteUserController(req : Request , res : Response , next : NextFunction){
    const id : number = Number(req.params.id)

    const response = await deleteUserService(id);

    createSuccessResponse(res,response,'user delete successfully');
}

export async function updateUserController(req : Request , res : Response , next : NextFunction){

    const id : number = Number(req.params.id);

    const data = req.body;

    const response = await updateUserService(id,data);
    
    createSuccessResponse(res,response,'user updated successfully');
}