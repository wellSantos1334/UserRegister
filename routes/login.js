const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const SECRET = 'passwell'
const User = require('../models/mdusers')
const Emp = require('../models/mdemps')



router.get('/login', function (req, res) {
    res.render('login/login')
})

router.post('/loginsuccess', async function (req, res) {
    console.log(req.body)
    const authUser = await User.findOne({
        where: { email: req.body.email },
    })
    const userId = authUser.id
    const login = authUser.email
    const senha = authUser.pass

    console.log(login)

    // res.render('users/clientes', { authUser: authUser})

    if (req.body.email == login && req.body.pass == senha) {
        const token = jwt.sign({ userId }, SECRET, { expiresIn: 600 })
        // return res.json({auth: true, token})
        console.log(token)
        // res.redirect('/teste')
        // res.send({
        //     token: token
        // })
        res.send("KKSADKD")

        // res.render('users/clientes', { authUser: authUser }, token)
    } else {
        res.status(401).end()
        console.log("User não existe")
    }


})

router.post('/teste', verifyJWT, function (req, res) {
    console.log(req.userId + " fez essa chamada.")
})

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token']
    console.log(token)
    jwt.verify(token, SECRET, function (err, decoded) {
        if (err) return res.status(401).send('Token inválido')

        req.userId = decoded.userId
        next()
    })
}



module.exports = router

