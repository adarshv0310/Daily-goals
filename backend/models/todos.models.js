import mongoose from 'mongoose'
import User from './user.models'

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    complete: {
        type: Boolean,
        default: false,
    },
    subTodos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",

    }],
}, {
    timestamps: true
});


const Todo = mongoose.model('Todo', TodoSchema);