const { User } = require('.././models/user');

//middleware to ascertain the token is of the specific user
let auth = (req,res,next)=>{

    let token = req.cookies.auth;

    //refer findByToken statics method in models/user
    User.findByToken(token,function(err,user){

        if(err) throw err;
        if(!user) return res.json({
            error:true
        });

        //if everything ok inject token and user to req and then continue to next function/process
        req.token = token;
        req.user = user;
        next();

    })



}

module.exports = {auth}