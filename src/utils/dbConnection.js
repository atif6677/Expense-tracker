
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('expenseapp', 'root', 'Atif@123', {
    host: 'localhost',
    dialect: 'mysql'}
);



 (async()=>{
try {
     await sequelize.authenticate()
     console.log('Connection has been established successfully.');
}
catch(err){
    console.error('Unable to connect to the database:', err);
}})()





module.exports =sequelize;