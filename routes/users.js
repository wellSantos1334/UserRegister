const express = require('express')
const router = express.Router('')
const User = require('../models/mdusers')
const Emp = require('../models/mdemps')


// Create User
router.get('/createUser', function (req, res) {
    res.render('users/createUser')
})

router.post('/newUser', function (req, res) {
    User.create({
        email: req.body.email,
        pass: req.body.pass,
    }).then(function (result) {
        Emp.create({
            idUser: result.id,
            cpf: req.body.cpf,
            departamento: req.body.departamento,
            cargo: req.body.cargo
        }).then(function () {
            res.redirect('/createUser')
            console.log("User criado com sucesso")
        })
    }).catch(function (err) {
        console.log("Falha ao cadastrar usuário: " + err)
    })
})

// Search Users
router.get('/searchUser', function (req, res) {
    User.findAll({
        order: [['id', 'DESC']],
    }).then(function (dados) {
        res.render('users/searchUser', { dados: dados })
    })
})


// Edit Users

router.get('/users/searchUser/edit/:id', function (req, res) {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (updateUser) {
        res.render('users/editusers', { updateUser: updateUser })
    }).catch(function (err) {
        res.send("Usuário inexistente")
        res.redirect('/users/editusers')
    })

})

router.post('/users/updatedUser', function (req, res) {
    User.update({
        email: req.body.email,
        pass: req.body.pass
    },
        {
            where: {
                id: req.body.id
            }
        }).then(function () {
            console.log("Usuário alterado com sucesso!")
            res.redirect('/searchUser')
        }).catch(function(err){
            console.log("Erro ao alterar dados do usuário: "+err)
            res.redirect('/searchUser')
        })
})

// Search Emps
router.get('/searchEmp', function (req, res) {
    Emp.findAll({
        order: [['id', 'DESC']],
    }).then(function (dados) {
        res.render('users/searchEmp', { dados: dados })
    })
})

// Edit Emps

router.get('/users/searchEmp/edit/:id', function (req, res) {
    Emp.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (updateEmp) {
        res.render('users/editemps', { updateEmp: updateEmp })
    }).catch(function (err) {
        res.send("Usuário inexistente")
        res.redirect('/users/editemps')
    })

})

router.post('/users/updatedEmp', function (req, res) {
    Emp.update({
        cpf: req.body.cpf,
        departamento: req.body.departamento,
        cargo: req.body.cargo
    },
        {
            where: {
                id: req.body.id
            }
        }).then(function () {
            console.log("Usuário alterado com sucesso!")
            res.redirect('/searchEmp')
        }).catch(function(err){
            console.log("Erro ao alterar dados do funcionário: "+err)
            res.redirect('/searchEmp')
        })
})


// Exports
module.exports = router