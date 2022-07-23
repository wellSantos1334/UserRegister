const db = require('../db')

// BD Users
const newUser = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: db.Sequelize.STRING
    },
    pass: {
        type: db.Sequelize.STRING
    }
})


module.exports = newUser