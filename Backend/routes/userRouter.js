import express from 'express';
import {logout, login, register } from '../controllers/userController.js';
// import {isAuthorised} from '../middlewares/Auth.js';

const router = express.Router();

router.post('/register', register);
router.post("/login", login)
router.get("/logout", logout)
export {router as UserRouter};