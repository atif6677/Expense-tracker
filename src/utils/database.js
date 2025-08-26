
const { Sequelize } = require('sequelize');

const db = new Sequelize('expencetracker', 'root', 'Atif@123', {
    host: 'localhost',
    dialect: 'mysql'
});


(async ()=>{
    try{
        await db.authenticate();
        console.log("Connection has been established sucessfully.");
    }
    catch(err){
        console.log("Unable to connect to the database",err);
    }
})();


module.exports = db
            