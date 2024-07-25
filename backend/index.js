import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoUrl } from './config.js';

//Initialize app
const app = express()
mongoose.connect(mongoUrl)
    .then(
        app.listen(PORT, () => {console.log(`App is live on port ${PORT}`)}),
        console.log("Connected to DB")
    )
    .catch(() => {
        console.log("Error occured connecting to database!")
    })
    
//feature branch
