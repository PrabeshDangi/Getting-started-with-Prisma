//Import cookie and prisma

const prisma=require("../prisma/index")
const cookieToken = require("../utils/cookieToken")
const cookie=require("../utils/cookieToken")

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
