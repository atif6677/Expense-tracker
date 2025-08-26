
const {DataTypes} = require('sequelize');
const db = require('../utils/database');

const Expense = db.define('expence',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull:false,

    },
    description:{
        type : DataTypes.STRING,
        allowNull:false,

    },
    category:{
        type : DataTypes.STRING,
        allowNull:false
    }
    
})

module.exports = Expense;