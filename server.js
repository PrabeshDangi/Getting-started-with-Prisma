const cookieParser=require("cookie-parser")
const express=require("express")
const userRoutes=require("./Routes/userRoute")
const postRoutes=require("./Routes/postRoutes")

require('dotenv').config()

const app=express()

const port=process.env.PORT||3000;

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cookie middleware
app.use(cookieParser())

app.use('/api',userRoutes)
app.use('/api',postRoutes)

app.listen(port,()=>{
    console.log("Server is running in port 3000")
})