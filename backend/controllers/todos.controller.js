import Todo from "../models/todos.models.js";
import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";



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


export const getTodobyId = async(req, res, next) => {
    try {

        const todoId = req.param.todoId;
        const todo = await Todo.findById(todoId).populate('subTodos');

        if (!todo) {
            return next(errorHandler(404, 'Todo not found '));
        }
        res.status(200).json(todo);


    } catch (error) {
        console.log(`Login error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}


export const createTodo = async(req, res, next) => {
    try {

        const { content } = req.body;
        const createdBy = req.user.id;

        const user = await User.findById(createdBy);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }

        const newTodo = new Todo({
            content,
            createdBy,

        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.log(`create todo error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}