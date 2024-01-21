const cookieParser=require("cookie-parser")
const express=require("express")

require('dotenv').config()

const app=express()

//regular middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cookie middleware
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Hello from server!!")
})

app.listen(3000,()=>{
    console.log("Server is running in port 3000")
})