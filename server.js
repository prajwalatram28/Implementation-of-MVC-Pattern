if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express();
const indexRouter = require('./routes/index')
const port = "http://localhost:3000/"
//importing express layout that we have install 
const authorRouter = require('./routes/authors')
const bodyParser = require('body-Parser')
const expressLayouts = require("express-ejs-layouts")
// setting up the ejs as view engine 
app.set("view engine" , "ejs")
//setting up the views where it is coming from 
app.set('views', __dirname + '/views');
// hooked up express layout we tell it we want ot set of what our layout file is going to be 
// and essentially the idea behind it a layout file is that every single file is going to put inside this layout file is
// so we don't have to dulicate all the beganing html and ending html of our project such as header and footers
app.set('layout', 'layouts/layout')
// also using express layouts
app.use(expressLayouts)
// use the public folder and its branches
app.use(express.static('public'))
//process.env.PORT which is going to pull from ann environment variable for when we deploy the server is going to tell us what  port it is listing to not us 
// but for development we're justgoing to default use 3000
app.use(bodyParser.urlencoded({limit :"10mb",extended :false}))
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,{UseNewUrlParser:true})

const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open',error => console.log('connected to Mongoose'))

app.use('/', indexRouter)
app.use("/authors" , authorRouter)










app.listen(process.env.PORT || 3000)
console.log(`The Port is running on ${port}`)