const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req,res,next) => {
    let token;
    if(!token){
        res.status(401);
        throw new Error("token is missing");
    }
    
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }else{
                req.user = decoded.user;
                next();
            }
        });
    }
})

module.exports = validateToken;