const mongoose = require('mongoose')
const { Bool } = require('mongoose/lib/schema/index')
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["spicy",'sweet','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})
const MenuItem = mongoose.model("menuItem",menuSchema)
module.exports = MenuItem
