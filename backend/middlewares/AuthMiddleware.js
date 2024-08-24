const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    let token = req.cookies.jwt;
    
    if(token){
        //verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({msg: "Token is not valid"});
            }else{
                req.user = decoded;
                next();
            }
        })
    }else{
        res.status(403).json({msg: "Unauthenticated."});
    }
}

module.exports = AuthMiddleware;