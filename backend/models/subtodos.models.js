import mongoose from "mongoose";


const subTodoSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true

    },
    complete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


const SubTodo = mongoose.model('SubTodo', subTodoSchema);

export default SubTodo;