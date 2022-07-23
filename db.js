const Sequelize = require('sequelize')
const sequelize = new Sequelize ('generic_api', 'root', 'Well@134', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw:true},
    define: {timestamps: false}
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}