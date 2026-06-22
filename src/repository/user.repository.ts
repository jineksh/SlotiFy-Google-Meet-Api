
import { prisma } from "../config/database.js";
import {
    userType
} from '../dtos/users.dto.js'


export async function createUser(data : userType){


    const user = await prisma.user.create({data});

    return user;


}


export async function getUserByEmail(email : string){
    
    const user = await prisma.user.findUnique({
        where : {
            email 
        }
    })

    return user;

}

export async function getUserById(id : number){
    
    const user = await prisma.user.findUnique({
        where : {
            id
        }
    })

    return user;

}

export async function getAllUsers(){
    
    const users = await prisma.user.findMany()

    return users;

}

export async function deleteUser(id : number){


    const response = await prisma.user.delete({
        where : {id}
    });

    return response;

}