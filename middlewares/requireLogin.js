module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(402).send({error: "You must login"})
    }

    next();
}