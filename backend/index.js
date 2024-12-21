import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
dotenv.config();
const password = process.env.password;
const port = process.env.PORT || 8001;

// mongodb connection 
const uri = `mongodb+srv://adarshsingh2003v:${password}@cluster0.wd9u3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongodb connected'))
    .catch((error) => console.log(`Mongodb error ${error}`));




// middlewre

app.use(express.json());
app.use(cors());


app.use((req, res, err, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";


    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


app.listen(port, () => {
    console.log(`
Server is listening on port ${ port }
`);
})