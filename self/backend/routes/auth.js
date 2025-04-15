import express from "express"
const router = express.Router();
import {loginValidation, signupValidation} from '../middlewares/AuthValidation.js'
import {login, signup} from "../controllers/AuthController.js";


router.post('/login',loginValidation,login)

router.post('/signup',signupValidation,signup);


export default router;