const express = require('express')
const handle = require('express-handlebars')
const users = require('./routes/users')
const path = require('path')

const PORT = 3535
const app = express()

//Template
app.engine('handlebars', handle.engine({ default: 'main' }))
app.set('view engine', 'handlebars')

// Public
app.use(express.static(path.join(__dirname + '/public')))

// Config
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.get('/', function(req, res){
    res.render('home')
})
app.use(users)

app.listen(PORT, function(){console.log("Servidor rodando!")})