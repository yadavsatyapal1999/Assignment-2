const jwt= require('jsonwebtoken')
module.exports= (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
       // console.log(token)
       const verifiedtoken= jwt.verify(token,"master done");

       // console.log(verifiedtoken.id);
        req.id=verifiedtoken.id
        next();
    }
    catch{
        res.send("auth failed at token verification")
    }
}

