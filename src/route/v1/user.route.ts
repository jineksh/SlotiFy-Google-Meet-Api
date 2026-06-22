import { Router } from "express";
import { validateDto } from "../../middleware/validate.js";
import { createUserController,getUserByIdController,getUserByEmailController,
    deleteUserController,updateUserController
} from "../../controller/user.controller.js";
import { userSchema,updateUserSchema } from "../../dtos/users.dto.js";

export const userRouter : Router = Router();


userRouter.post('/',validateDto(userSchema),createUserController);

userRouter.get('/',getUserByEmailController);

userRouter.get('/:id',getUserByIdController);

userRouter.delete('/:id',deleteUserController);

userRouter.patch('/:id',validateDto(updateUserSchema),updateUserController);