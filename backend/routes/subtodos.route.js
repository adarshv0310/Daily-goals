import express from 'express'
import { createsubtodo } from '../controllers/subtodos.controllers'


const router = express.Router();


router.post('/:todoId/createsubtodo');

export default router;