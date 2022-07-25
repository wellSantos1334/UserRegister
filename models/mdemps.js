const db = require('../db')
const User = require('./mdusers')

// BD Emps
const newEmp = db.sequelize.define('emps', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idUser: {
        type: db.Sequelize.INTEGER,
        references: 'users',
        referencesKey: 'id'
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    departamento: {
        type: db.Sequelize.STRING
    },
    cargo: {
        type: db.Sequelize.STRING
    }
})

newEmp.belongsTo(User, {
    constraint: true,
    foreignKey: 'idUser'
})

module.exports = newEmp