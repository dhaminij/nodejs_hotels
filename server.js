const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Person = require('./models/Person')
const LocalStrategy = require('passport-local').Strategy
const passport = require('./auth')

// middleware
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.path}`);
    next();
}
app.use(logRequest);

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/',function(req,res){
    res.send('welcome to hotel');
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person',localAuthMiddleware,personRoutes)
app.use('/menu',menuRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('listening on port 3000');
})