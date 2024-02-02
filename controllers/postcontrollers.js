const prisma=require('../prisma/index')


// create a post
exports.createPost=async(req,res,next)=>{
    try {
        const {slug, title, body, authorId}=req.body
        if(!slug || !title || !body || !authorId)
        {
            res.status(400).json({
                error:"All fields are required!!"
            })
        }
        const result= await prisma.post.create({
            data:{
                slug,
                title,
                author:{connect:{id:authorId}}
            }
        })
        res.json(result)
        
    } catch (error) {
        console.log("Error has occurred!!".error)
        res.status(500).json({
            error:"Internal server Error!!"
        })
        
    }
}

exports.updatePost=async(req,res,next)=>{
    const {id}= req.params
    const {title,body}= req.body;
    try {
        const result=await prisma.post.update({
            where:{id:id},
            data:{
                title,
                body
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:"Internal server Error!!"
        })
    }
}

exports.deletePost=async(req,res,next)=>{
    try {
        const {id}=req.params
        const result=await prisma.post.delete({
            where:{id:id}
        })
        res.status(200).json({
            message:`Post deleted successfully!!`
        })
        
    } catch (error) {
        res.status(500).json({
            error:`Error has occurred. ${error}`
        })
    }
}

exports.getAllPosts=async(req,res,next)=>{
    try {
        const result=await prisma.post.findMany()
        res.json(result)
        
    } catch (error) {
        res.json({
            error:`No posts found!!`
        })
    }
}