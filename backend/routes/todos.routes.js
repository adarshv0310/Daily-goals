import express from 'express';
import {
    getTodos,
    getTodobyId,
    createTodo

} from "../controllers/todos.controller.js";

import { userVerification } from "../middlewares/userverification.middleware.js";

const router = express.Router();


router.get('/getalltodos', userVerification, getTodos);
router.post('/createtodo', userVerification, createTodo);
router.get('/gettodosbyid/:todoId', userVerification, getTodobyId)
export default router;