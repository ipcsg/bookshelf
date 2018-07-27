const mongoose = require('mongoose');

//schema for the book
const bookSchema = mongoose.Schema({

        name:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        review:{
            type:String,
            default:'n/a'
        },
        pages:{
            type:String,
            default:'n/a'
        },
        rating:{
            type:Number,
            required:true,
            min:1,
            max:5
        },
        price:{
            type:String,
            default:'n/a'
        },
        ownerId:{
            type:String,
            required:true
        }

},{timestamps:true});

//creating the Book model by connecting the Book model to its Schema
const Book = mongoose.model('Book', bookSchema);

//exporting the module
module.exports = { Book };
