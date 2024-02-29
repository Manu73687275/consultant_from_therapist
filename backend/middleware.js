
const jwt = require("jsonwebtoken")
const {jwt_secret} = require("./config.js");

const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("from middleware")
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    
    try {
        
        const decoded =jwt.verify(token,jwt_secret);
        
        req.userid = decoded.userid;
        console.log(req.userid)
        next();
    } catch (err) {
        return res.status(403).json({
            err
        });
    }
};


module.exports = {
    userMiddleware
}