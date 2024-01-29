const { DataTypes } = require('sequelize')
const User = require('./userModel')

const sequelize = require('../utils/database')

const Follow = sequelize.define('follow', {
    following: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        },
        primaryKey: true
    },
    follower: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'username'
        },
        primaryKey: true
    }
}, {
    timestamps: false
});

module.exports = Follow