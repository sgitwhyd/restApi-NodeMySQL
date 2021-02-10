const { DataTypes } = require("sequelize")
const db = require("../config/db")

const User = db.define(
    'users', {
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://placekitten.com/320/320"
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        freezeTableName: true
    })

module.exports = User