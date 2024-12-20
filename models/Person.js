const mongoose = require('mongoose')
const { String } = require('mongoose/lib/schema/index')
const string = require('nodash/lib/string')
const type = require('nodash/lib/type')
const bcryprt = require('bcrypt')
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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
personSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
    try {
        const salt = await bcryprt.genSalt();
        const hashedPassword = await bcryprt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error)
    }
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcryprt.compare(candidatePassword,this.password);
        return isMatch
    } catch (error) {
        throw error
    }
}
const Person = mongoose.model('Person',personSchema)
module.exports = Person