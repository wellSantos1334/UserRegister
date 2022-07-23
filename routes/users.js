const express = require('express')
const router = express.Router('')
const User = require('../models/mdusers')
const Emp = require('../models/mdemps')

router.get('/createUser', function(req, res){
    res.render('users/createUser')
})

router.post('/newUser', function(req, res){
    User.create({
        email: req.body.email,
        pass: req.body.pass,
    }).then(function(result){
        Emp.create({
            idUser: result.id
        }).then(function(){
            res.redirect('/createUser')
            console.log("User criado com sucesso")
        })
    }).catch(function(err){
        console.log("Falha ao cadastrar usuário: "+ err)
    })

})

// Exports
module.exports = router