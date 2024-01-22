const { DataTypes } = require('sequelize')

const sequelize = require("../utils/database")

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topic : {
        type: DataTypes.STRING
    }
}, {
    updatedAt: false
});


module.exports = Post;