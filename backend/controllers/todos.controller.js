import Todo from "../models/todos.models";
import User from "../models/user.models";
import { errorHandler } from "../utils/error";



export const getTodos = async(req, res, next) => {
    try {
        const userId = req.param.userId;
        const todos = await Todo.find({ createdBy: userId }).populate('subTodos');

        res.status(200)
            .json(todos);

    } catch (error) {
        console.log(`Login error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}