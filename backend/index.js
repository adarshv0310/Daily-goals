import express from 'express';
import cors from 'cors';
import env from 'dotenv';

const app = express();

const password = process.env.password;
const port = process.env.PORT || 8001;


app.listen(port, () => {
    console.log(`Server is  listening on port ${port}`);
})