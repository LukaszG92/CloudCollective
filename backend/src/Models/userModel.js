const { DataTypes } = require('sequelize')

const sequelize = require('../utils/database')

const User = sequelize.define('user', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cognome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: "https://cloudcollective.blob.core.windows.net/images/defaultavatar.png"
    }
}, {
    timestamps: false
});


module.exports = User;
