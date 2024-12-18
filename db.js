const mongoose = require("mongoose");

// const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = 'mongodb+srv://helloworld:dhamini123@cluster0.yprw1.mongodb.net/'
mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to mongodb server');
})
db.on('error',(err)=>{
    console.log("mongodb connection error", err);
})
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
});

module.exports=db;
