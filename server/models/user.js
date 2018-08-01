const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);//refer config/config.js

const SALT_I = 10;

//Schema for the user model
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:100
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }

})

//hashing password -- this happens before save -- see 'save' in pre function --> userSchema.pre('save',.....)
userSchema.pre('save',function(next){
    let user = this;
    if(user.isModified('password'))
    {
            bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next()

            })
        })
    }
    else{
        next();
    }
})

//comparing password when login ---------- here were are injecting a method to User model so the method is available on any instance of User
userSchema.methods.comparePasswords = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

//Generating tokens when login (for sessions)
userSchema.methods.generateToken = function(cb){
    let user = this;
    let token = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

//connecting User model to its schema
const User = mongoose.model('User',userSchema);

module.exports = { User }