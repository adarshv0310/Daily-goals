import mongoose from "mongoose";


const subTodoSchema = new mongoose.Schema({

}, { timestamps: true });


const SubTodo = mongoose.model('SubTodo', subTodoSchema);

export default SubTodo;