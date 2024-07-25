import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoUrl } from './config.js';
import { errorHandler } from './errorHandler.js';
import booksRouter from './routes/bookRoutes.js';

//Initialize app
const app = express()
app.use(express.json())
app.use('/books', booksRouter)
app.use(errorHandler)
app.use(cors())
mongoose.connect(mongoUrl)
    .then(
        app.listen(PORT, () => {console.log(`App is live on port ${PORT}`)}),
        console.log("Connected to DB")
    )
    .catch(() => {
        console.log("Error occured connecting to database!")
    })
