const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../utils/dbConnection');


const user = sequelize.define('user', {
   
    expenceAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}); 


user.sync()



module.exports = user;