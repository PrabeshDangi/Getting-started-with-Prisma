const prisma=require("../prisma/index")
const jwt=require('jsonwebtoken')

const isLoggedIn= async(req,res,next)=>{
    try {
        const token=req.cookie.token;
        if(!token)
        {
            res.send('Please Login');

        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        req.user= await prisma.user.findUnique({
            where:{
                id: decoded.userId
            }
        })
        next()  
    } catch (error) {
        res.status(500).json({
            error:"Internal Server Error!!"
        })
    }
}


module.exports=isLoggedIn