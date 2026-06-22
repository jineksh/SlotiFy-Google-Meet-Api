
import { updateUserType, userType } from "../dtos/users.dto.js";
import {
    createUser as createUserRepository,
    getUserByEmail as getUserByEmailRepository,
    getUserById as getUserByIdRepository,
    deleteUser as deleteUserRepository,
    updateUser as updateUserRepository


} from '../repository/user.repository.js'
import { conflict,notFound } from "../utils/errorHandler.js";


export async function createUserService(data : userType){

    console.log('inside service layer')

    const existingUser = await getUserByEmailRepository(data.email);

    if(existingUser){
        throw conflict('user already exits');
    }

    console.log('not user exits');
    const user = await createUserRepository(data);


    return user;
}


export async function getUserByIdService(id : number){

    const user = await getUserByIdRepository(id);

    if(!user){
        throw notFound('user not found');
    }
    return user;

}

export async function getUserByEmailService(email : string){

    const user = await getUserByEmailRepository(email);

    if(!user){
        throw notFound('user not found');
    }
    return user;

}


export async function deleteUserService(id : number){

    const response = await deleteUserRepository(id);

    return response;

}

export async function updateUserService(id : number,data : updateUserType){

    const user = await getUserByIdRepository(id);

    if(!user){
        throw notFound('user not found');
    }

    const updatedUser = await updateUserRepository(id,data);

    return updatedUser;

}