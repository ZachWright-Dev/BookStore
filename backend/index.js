import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoUrl } from './config.js';
import { errorHandler } from './errorHandler.js';
import { validateBook } from './middleware.js';
import { Book } from './models/BookModel.js';

//Initialize app
const app = express()
app.use(express.json())
app.use(errorHandler)
mongoose.connect(mongoUrl)
    .then(
        app.listen(PORT, () => {console.log(`App is live on port ${PORT}`)}),
        console.log("Connected to DB")
    )
    .catch(() => {
        console.log("Error occured connecting to database!")
    })

//Create a book
app.post('/books', validateBook, async (req, res, next) => {
    const { title, author, publishYear }  = req.body

    try{
        const book = await Book.create({title, author, publishYear})
        console.log("Success making book!", book)
        res.status(201).json(book)
    } catch(e) {
        console.log("Error creating the new book!", e)
        next(e)
    }
})

//Get all books from db
app.get('/books', async(req, res, next) => {
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data:books
        })
    } catch(e) {
        next(e)
    }
})


//Get book by id
app.get('/books/:id', async(req, res, next) => {
    const { id } = req.params
    try{
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch(e){
        next(e)
    }
})

app.put('/books/:id', validateBook, async(req,res,next) => {
    const { id } = req.params
    const { title, author, publishYear } = req.body
    try{
        const book = await Book.findByIdAndUpdate(id,{title, author, publishYear}, {new: true} )
        return res.status(200).json(book)
    } catch(e){
        next(e)
    }
})
    
