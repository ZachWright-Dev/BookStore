const errorHandler = (err, req, res, next) => {
    console.log("Error", err)
    res.status(500).send("Internal server error")
}

export { errorHandler }
