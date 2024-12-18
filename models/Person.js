const mongoose = require('mongoose')
const string = require('nodash/lib/string')

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    age :{
        type:Number,
    },
    mobile:{
        type:String
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    email:{
        type:String,
        unique :true,
        required:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    }
})
const Person = mongoose.model('Person',personSchema)
module.exports = Person