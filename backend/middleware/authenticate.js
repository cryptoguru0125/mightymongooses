const jwt = require('jsonwebtoken');
const User= require('../model/userSchema');
const authenticate=async(req,res,next)=>{
    try{
        console.log("req.cookies=",req.cookies);
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        console.log("verifytoken=",verifyToken);

        const rootUser=await User.findOne({_id:verifyToken._id,'tokens.token':token});
        console.log("rootUser=",rootUser);
        if(!rootUser){throw new Error('user not found')};

        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;
        next();
    }catch(err){
        res.status(401).send("Unauthorised: No token provided");
        console.log(err);
    }

}

module.exports=authenticate;
