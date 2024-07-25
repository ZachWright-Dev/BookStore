import express from 'express';
import { validateBook } from '../middleware.js';
import { Book } from '../models/BookModel.js';
const router = express.Router()

//Create a book
router.post('/', validateBook, async (req, res, next) => {
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
router.get('/', async(req, res, next) => {
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
router.get('/:id', async(req, res, next) => {
    const { id } = req.params
    try{
        const book = await Book.findById(id)
        return res.status(200).json(book)
    } catch(e){
        next(e)
    }
})

//Update a book
router.put('/:id', validateBook, async(req,res,next) => {
    const { id } = req.params
    const { title, author, publishYear } = req.body
    try{
        const book = await Book.findByIdAndUpdate(id,{title, author, publishYear}, {new: true} )
        if (!book){
            return res.status(400).send("Book not found!")
        }
        return res.status(200).json(book)
    } catch(e){
        next(e)
    }
})

//Delete a book
router.delete('/:id', async(req, res, next) => {
    const { id } = req.params
    try{
        const result = await  Book.findByIdAndDelete(id)
        if (!result){
            return res.status(400).send("Book not found!")
        }
        return res.status(200).json({message: "Book deleted successfully!"})
    } catch(e) {
        next(e)
    }
})

export default router