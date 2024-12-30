import {
    getTodos,
    getTodobyId
} from "../controllers/todos.controller.js";
import express from 'express ';
import { userVerification } from "../middlewares/userverification.middleware.js";

const router = express.Router();


router.get('/getalltodos', userVerification, getTodos);


export default router;