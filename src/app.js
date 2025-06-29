const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const app = express();
const db = require('./utils/dbConnection');  
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));




app.use(express.json());
app.use('/users', userRoutes);



app.get('/', (req, res) => {
  res.send("Welcome to the Expense Tracker API");
});





db.sync({ force: false })
  .then(() => {
    console.log('Database & tables created/synced!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database or sync models:', err);
  });