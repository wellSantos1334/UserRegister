const express = require('express')
const handle = require('express-handlebars')
const users = require('./routes/users')
const login = require('./routes/login')
const path = require('path')
const PORT = 3535
const app = express()
const cors = require('cors')

app.use(cors())

//Template
app.engine('handlebars', handle.engine({ default: 'main' }))
app.set('view engine', 'handlebars')

// Public
app.use(express.static(path.join(__dirname + '/public')))

// Config
// app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(users)
app.use(login)

app.get('/', function (req, res) {
    res.send('BOSTA')
    // res.render('home')
})


app.listen(PORT, function () { console.log("Servidor rodando!") })