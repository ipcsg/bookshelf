const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config.js').get(process.env.NODE_ENV);//refer config/config.js
const app = express(); //starting express app


//connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{useNewUrlParser:true});//config.DATABASE at config/config.js

//data models
const { User } = require('./models/user');
const { Book } = require('./models/book');

//using middlewares
app.use(bodyParser.json());
app.use(cookieParser());


//=======================================*******Routes (Requests)*********======================================================

//GET ---------------------------------------------------------------------

/*Book*/
app.get('/',(req,res)=>{
    let home = config.DATABASE;
    res.status(200).send(home)
})

    //--------get book by Id
    app.get('/api/getBook',(req,res)=>{
        
        let id = req.query.id;
        Book.findById(id,(err,doc)=>{
            //if not found or error
            if(err) return res.status(400).json({
                message:'Could not find the item'
            }); 
            //if found
            res.status(200).send(doc);
        })
    })

    //---------get books
    /*Book*/
    app.get('/api/books',(req,res)=>{
        //url example == > localhost:3001/api/books?kip=1&limit=5&order=asc
        let skip = parseInt(req.query.skip);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;

        //get Books...
        //ORDER = asc || desc
        Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
            //if error
            if(err) return res.status(400).send(err);
            //if items found
            res.send(doc);
        })
    })




//POST---------------------------------------------------------

/*Book*/
app.post('/api/book',(req,res)=>{
    //defining a new book instance with the Book model
    const book = new Book(req.body);
    
    //saving to db
    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
})



/*User*/
app.post('/api/register',(req,res)=>{
    let user = new User(req.body);
    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.json({
            success:true,
            doc
        })
    })
})

//User login - please refer --> comparingPasswords in user.js
app.post('/api/login',(req,res)=>{

    User.findOne({"email":req.body.email},(err,user)=>{

        if(!user) return res.json({isAuth:false,message:'Auth failed. Emait not found!'});

        user.comparePasswords(req.body.password,(err,isMatch)=>{
            //if password did not match
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong Password'
            }) 

            //if password matched
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);

                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })


        })

    })

})

// Get reviewer name
app.get('/api/getReviewer',(req,res)=>{
    //get the id from the query eg:---->  http://localhost:3000/api/getReviewer?id=213g86821238971
    let id = req.query.id;
    
    User.findById(id,(err,user)=>{
        //if err
        if(err) return res.status(400).send(err);

        //if user found
        res.json({
            name:user.name,
            lastname:user.lastname
        })

    })


})


//Get all users
app.get('/api/users',(req,res)=>{

    User.find({},(err,users)=>{
        //if err
        if(err) return res.status(400).send(err);

        //if any
        res.send(users);


    })

})


//UPDATE------------------------------------------------------------------
/*Book*/
app.post('/api/book_update',(req,res)=>{

    Book.findByIdAndUpdate(req.body._id,req.body,(err,doc)=>{

        if(err) return res.status(400).send(err);

        res.json({
            success:true,
            doc
        })

    })

})






//DELETE------------------------------------------------------------------------
/*Book*/
app.delete('/api/delete_book',(req,res)=>{
    let id = req.query.id;
    Book.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})


//listening to port
const port = process.env.PORT || 3001;

app.listen(port,()=>console.log(`Server running on port ${port}`));