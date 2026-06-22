
import {v1Router} from './v1/index.js';
import { Router } from "express";


export const router : Router = Router();

router.use('/v1',v1Router);