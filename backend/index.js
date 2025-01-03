import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import todoRouter from './routes/todos.routes.js';

const app = express();
dotenv.config();
const password = process.env.password;
const port = process.env.PORT || 8001;

// MongoDB connection
const uri = `mongodb+srv://adarshsingh2003v:${password}@cluster0.wd9u3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb connected'))
    .catch((error) => console.log(`Mongodb error ${error}`));

// Middleware
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/user', userRouter);
app.use('/todos', todoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});