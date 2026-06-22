import { Router } from "express";
import { validateDto } from "../../middleware/validate.js";
import { createUserController,getUserByIdController,getUserByEmailController,
    deleteUserController
} from "../../controller/user.controller.js";
import { userSchema } from "../../dtos/users.dto.js";

export const userRouter : Router = Router();


userRouter.post('/',validateDto(userSchema),createUserController);

userRouter.get('/',getUserByEmailController);

userRouter.get('/:id',getUserByIdController);

userRouter.delete('/:id',deleteUserController);
