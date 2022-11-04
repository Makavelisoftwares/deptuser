const jwt=require('jsonwebtoken');


const protectRoute=(req,res,next)=>{
    const token=req.cookies.auth;

    jwt.verify(token,'secret',(err,decodedToken)=>{
        if(err){
            res.redirect('/login');
        }else{
            // res.redirect('/users')
            console.log(decodedToken)
            next()
        }
    })

}


module.exports={
    protectRoute
}