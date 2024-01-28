const getJwtToken=require("../helpers/getJwtToken")


const cookieToken = (user,res)=>{
    const token=getJwtToken(user.id);
    const options={
        expires:new Date(
            Date.now()+3*24*60*60*1000
        ),
        httpOnly:true
    }
    user.password=undefined//Cookie pathauda password pani najawos vanera overwrite garddeko..
    res.status(200).cookie('token',token, options).json({
        success:true,
        token,
        user // This gives response of user details ..yedi yo line hatayo vane user.password wala line narakhda nee hunchha..
    })
}

module.exports=cookieToken;