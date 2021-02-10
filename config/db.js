const { Sequelize } = require('sequelize')


const db = new Sequelize("CRUD", "root", "", {
    dialect: "mysql"
})

db.sync();

module.exports = db