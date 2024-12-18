const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const Person = require('./models/Person')
const menuItem = require('./models/menu')
const MenuItem = require('./models/menu')
const error = require('mongoose/lib/error')


app.get('/',function(req,res){
    console.log('welcoe to hotel');
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})