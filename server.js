const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest)
app.get('/',function(req,res){
    res.send('welcome to hotel');
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('listening on port 3000');
})