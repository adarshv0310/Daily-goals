import Todo from "../models/todos.models";
import User from "../models/user.models";
import SubTodo from "../models/subtodos.models";
import { errorHandler } from "../utils/error";



export const createsubtodo = async(req, res, next) => {
    try {
        const { content, complete } = req.body;
        const { todoId } = req.params;
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return errorHandler(404, 'Todo not found');
        }
        const newsubtodo = new SubTodo({
            content,
            complete,

        });
        const savedsubTodo = await newsubtodo.save();
        todo.subTodos.push(savedsubTodo._id);
        await todo.save();

        res.status(201).json(savedsubTodo);

    } catch (error) {
        console.log(`create todo error${error.message}`);
        return next(errorHandler(500, 'Internal server error'));
    }
}