const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');
const db = require('./utils/database');
const cors = require('cors');
app.use(cors());
app.use(express.json());

// serve all files in /public
app.use(express.static(path.join(__dirname, '../public')));

// signup API routes
app.use('/signup', signupRoutes);

// login API routes
app.use('/login', loginRoutes);

// sync DB and start server
db.sync()
  .then(() => {
    console.log('✅ Database synced');
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error syncing database:', error);
  });
