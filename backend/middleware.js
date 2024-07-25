const validateBook = (req, res, next) => {
    if (!req.body.title || !req.body.author || !req.body.publishYear){
        res.status(400).send("Fields are required: author, title, publishYear")
    }
    next();
}

export { validateBook };
