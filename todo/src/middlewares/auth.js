const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(!token){
            res.status(401).json({message:"You are Unauthorized"});
        }
        const user = jwt.verify(token, process.env.SECRET_KEY);
        if(!user){
            res.status(401).json({message:"You are Unauthorized"});
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({message:"You are Unauthorized"});
    }
}

module.exports = auth;

// use case 
// if we want to use a function or a check multiple time.
// we tend to use middlewares