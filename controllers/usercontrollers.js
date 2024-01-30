//Import cookie and prisma

const prisma=require("../prisma/index")
const cookieToken = require("../utils/cookieToken")
const cookie=require("../utils/cookieToken")
const bcrypt=require("bcryptjs")

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !password) {
            // If any required field is missing, send a 400 Bad Request response
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                name: name, 
                email: email, 
                password: password
            }
        });

        // Set token in cookie and send response
        cookieToken(user, res);
        
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error in signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login=async (req,res,next) => {
    try {
        const {email,password}=req.body;
        if(!email || ! password)
        {
            return res.status(400).json({ error: "All fields are required" });
        }
        //find a user based on email
        const user=await prisma.user.findUnique({
            where:{
                email
            }
        })
        //check if there is any user
        if(!user)
        {
            res.status(404).json({error:"No user found!!"})
        }

       // Compare passwords
    //    const passwordMatch = await bcrypt.compare(password, user.password);

    //    if (!passwordMatch) {
    //        return res.status(400).json({ error: "Invalid password" });
    //    }

    if(user.password!==password)
    {
        return res.status(400).json({ error: "Invalid password" });
    }
        cookieToken(user,res)
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.logout=async(req,res,next)=>{
    try {
        res.clearCookie('token')
        res.status(200).json({message:"logged out successfully!!"})
        
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
