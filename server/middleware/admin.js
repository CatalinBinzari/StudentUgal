let admin = (req,res,next) =>{
    if(req.user.role === "student" ){
        return res.send('you are not allowed, get out now.')
    }
    next();
}

module.exports = { admin }