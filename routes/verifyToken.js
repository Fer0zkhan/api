const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-Token');
    if (!token) return res.status(401).send({ "message": "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ "message": error });
    }
}