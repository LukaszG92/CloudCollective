const { DataTypes } = require('sequelize')

const sequelize = require("../utils/database");

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Comment;